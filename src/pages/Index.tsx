import { useEffect } from "react";
import bannerImage from "@/assets/profile-banner.png";
import galleryImage from "@/assets/profile-gallery-1.png";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MODEL_NAME = "Luna Noir";
const MODEL_CITY = "São Paulo, SP";
const WHATSAPP_NUMBER = "5511999999999"; // Ajuste para o número da modelo

const Index = () => {
  useEffect(() => {
    const title = `${MODEL_NAME} | Acompanhante para encontros discretos`;
    document.title = title;

    const description = `${MODEL_NAME}, acompanhante discreta em ${MODEL_CITY}. Veja rapidamente o perfil e chame direto no WhatsApp.`;

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
  }, []);

  const handleWhatsAppClick = () => {
    const text = `Olá, vi seu perfil (${MODEL_NAME}) no site e quero combinar um programa. Podemos falar por aqui?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-background">
      <Card className="surface-card-hover flex min-h-screen w-full flex-col overflow-hidden border border-border/70 bg-background-soft rounded-none">
        <div className="relative h-24 w-full overflow-hidden">
          <img
            src={bannerImage}
            alt={`Banner de perfil de ${MODEL_NAME}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
        </div>

        <CardContent className="relative flex flex-1 flex-col gap-6 px-5 pb-6 pt-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative -mt-12 h-24 w-24 overflow-hidden rounded-full border-2 border-border bg-background">
              <img
                src={galleryImage}
                alt={`Foto de perfil de ${MODEL_NAME}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-semibold leading-tight">
                {MODEL_NAME} – acompanhante
              </h1>
              <p className="text-sm text-muted-foreground">Programas presenciais (foco principal) em {MODEL_CITY}</p>
              <p className="text-xs text-muted-foreground">
                Também vendo conteúdos, packs e faço chamada de vídeo — tudo combinado direto pelo WhatsApp.
              </p>
            </div>
          </div>

          <p className="max-w-xl text-sm text-muted-foreground">
            Perfil simples e discreto para você chamar direto no WhatsApp e combinar o programa do seu jeito.
          </p>

          <div className="mt-auto max-w-sm space-y-2 pt-1">
            <Button className="w-full" size="lg" onClick={handleWhatsAppClick}>
              Chamar no WhatsApp para programa
            </Button>
            <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
              Você será redirecionado para o WhatsApp. Nenhum pagamento é feito pelo site, apenas o contato com a
              acompanhante.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Index;
