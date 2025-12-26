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
    <main className="min-h-screen bg-background px-0 py-0">
      <div className="mx-auto flex min-h-screen max-w-4xl items-stretch px-4 py-8">
        <Card className="surface-card-hover flex w-full flex-col overflow-hidden border border-border/70 bg-background-soft">
          <div className="relative h-32 w-full overflow-hidden rounded-b-xl">
            <img
              src={bannerImage}
              alt={`Banner de perfil de ${MODEL_NAME}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
          </div>

          <CardContent className="flex flex-1 flex-col gap-6 px-5 pb-6 pt-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-24 w-24 -mt-10 overflow-hidden rounded-full border-2 border-border bg-background">
                <img
                  src={galleryImage}
                  alt={`Foto de perfil de ${MODEL_NAME}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="space-y-2">
                <h1 className="text-xl font-semibold leading-tight">
                  {MODEL_NAME} – acompanhante
                </h1>
                <p className="text-sm text-muted-foreground">Programas presenciais · {MODEL_CITY}</p>
                <div className="flex flex-wrap gap-1 text-[11px]">
                  <Badge variant="outline" className="border-border/70 bg-background/50 text-foreground">
                    Discreta
                  </Badge>
                  <Badge variant="outline" className="border-border/70 bg-background/50 text-foreground">
                    Ambiente reservado
                  </Badge>
                  <Badge variant="outline" className="border-border/70 bg-background/50 text-foreground">
                    +18 apenas
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-xl">
              Acompanhante para encontros presenciais, com total sigilo. Combine o programa direto pelo WhatsApp.
            </p>

            <div className="mt-auto space-y-2 pt-1 max-w-sm">
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
      </div>
    </main>
  );
};

export default Index;
