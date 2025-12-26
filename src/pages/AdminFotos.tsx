import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminFotos = () => {
  const { toast } = useToast();
  const [perfilFile, setPerfilFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!perfilFile && !bannerFile) {
      toast({
        title: "Nada para enviar",
        description: "Selecione pelo menos uma imagem.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const updates: { profile_url?: string; banner_url?: string } = {};

      if (perfilFile) {
        const perfilPath = `perfil-${Date.now()}-${perfilFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("profile-assets")
          .upload(perfilPath, perfilFile, { cacheControl: "3600", upsert: true });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("profile-assets").getPublicUrl(perfilPath);
        updates.profile_url = data.publicUrl;
      }

      if (bannerFile) {
        const bannerPath = `banner-${Date.now()}-${bannerFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("profile-assets")
          .upload(bannerPath, bannerFile, { cacheControl: "3600", upsert: true });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("profile-assets").getPublicUrl(bannerPath);
        updates.banner_url = data.publicUrl;
      }

      const { error: upsertError } = await supabase.from("profile_assets").upsert(updates, {
        onConflict: "id",
      });

      if (upsertError) throw upsertError;

      toast({
        title: "Imagens atualizadas",
        description: "Atualize a página do perfil para ver as novas fotos.",
      });

      setPerfilFile(null);
      setBannerFile(null);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md border border-border/70 bg-background-soft">
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-1">
            <h1 className="text-lg font-semibold">Painel de fotos da Tereza</h1>
            <p className="text-xs text-muted-foreground">
              URL secreta só para você subir a foto de perfil e o banner usados no perfil público.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Foto de perfil</p>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setPerfilFile(e.target.files?.[0] ?? null)}
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Foto de banner</p>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files?.[0] ?? null)}
              />
            </div>

            <Button className="w-full mt-2" onClick={handleUpload} disabled={loading}>
              {loading ? "Enviando..." : "Salvar imagens"}
            </Button>

            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Depois de salvar, abra o perfil normal (/) para ver como ficou. Você pode voltar aqui a hora que
              quiser para trocar as fotos.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default AdminFotos;
