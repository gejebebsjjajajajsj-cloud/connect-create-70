import { useEffect, useState } from "react";
import bannerImage from "@/assets/profile-banner.png";
import galleryImage from "@/assets/profile-gallery-1.png";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MODEL_NAME = "Luna Noir";
const MODEL_CITY = "São Paulo, SP";
const WHATSAPP_NUMBER = "5511999999999"; // Ajuste para o número da modelo

type QuizAnswers = {
  service?: string;
  when?: string;
  location?: string;
};

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

  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});

  const openQuiz = () => {
    setQuizOpen(true);
    setQuizStep(1);
    setQuizAnswers({});
  };

  const handleSelect = (field: keyof QuizAnswers, value: string) => {
    setQuizAnswers((prev) => ({ ...prev, [field]: value }));
    setQuizStep((prev) => Math.min(prev + 1, 3));
  };

  const finalizeWhatsApp = () => {
    const parts: string[] = [`Olá, vi seu perfil (${MODEL_NAME}) no site.`];

    if (quizAnswers.service) {
      parts.push(`Quero ${quizAnswers.service}.`);
    }
    if (quizAnswers.when) {
      parts.push(`Para: ${quizAnswers.when}.`);
    }
    if (quizAnswers.location) {
      parts.push(`Local: ${quizAnswers.location}.`);
    }

    parts.push("Podemos falar por aqui?");

    const text = parts.join(" ");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setQuizOpen(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {quizOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-background/95 px-4">
          <div className="w-full max-w-md space-y-4 rounded-md border border-border/70 bg-background-soft p-4">
            <p className="text-base font-semibold">
              Antes de abrir o WhatsApp, me conta rapidinho o que você quer:
            </p>

            {quizStep === 1 && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">1 de 3 — O que você procura?</p>
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("service", "marcar um programa presencial")}
                  >
                    Marcar programa presencial
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("service", "comprar conteúdos e fotos")}
                  >
                    Comprar conteúdos / fotos
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("service", "fazer chamada de vídeo")}
                  >
                    Chamada de vídeo
                  </Button>
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">2 de 3 — Para quando?</p>
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("when", "para agora")}
                  >
                    Para agora
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("when", "para hoje ainda")}
                  >
                    Para hoje ainda
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("when", "para outro dia")}
                  >
                    Para outro dia
                  </Button>
                </div>
              </div>
            )}

            {quizStep === 3 && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">3 de 3 — Onde?</p>
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("location", "no meu local")}
                  >
                    No meu local
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("location", "no local dela")}
                  >
                    No seu local
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("location", "a combinar")}
                  >
                    A combinar
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2 pt-1">
              <Button className="w-full" size="lg" onClick={finalizeWhatsApp}>
                Ir para o WhatsApp
              </Button>
              <button
                type="button"
                onClick={finalizeWhatsApp}
                className="w-full text-center text-[11px] text-muted-foreground underline"
              >
                Pular perguntas e ir direto
              </button>
              <button
                type="button"
                onClick={() => setQuizOpen(false)}
                className="w-full text-center text-[11px] text-muted-foreground underline"
              >
                Voltar para o perfil
              </button>
            </div>
          </div>
        </div>
      )}

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
            <Button className="w-full" size="lg" onClick={openQuiz}>
              Chamar no WhatsApp
            </Button>
            <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
              Você será redirecionado para o WhatsApp para combinar programa, conteúdos ou chamada de vídeo direto
              comigo.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Index;
