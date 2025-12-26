import { useEffect, useState } from "react";
import bannerImageFallback from "@/assets/profile-banner.png";
import profileImageFallback from "@/assets/profile-gallery-1.png";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhoneCall, Camera, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const MODEL_NAME = "Tereza";
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
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);
  const [userRegion, setUserRegion] = useState<string | null>(null);
  const [whatsAppNumber, setWhatsAppNumber] = useState(WHATSAPP_NUMBER);

  useEffect(() => {
    const loadImages = async () => {
      const { data, error } = await supabase
        .from("profile_assets")
        .select("profile_url,banner_url")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        if (data.profile_url) setProfileImageUrl(data.profile_url);
        if (data.banner_url) setBannerImageUrl(data.banner_url);
      }
    };

    loadImages();

    const savedPhone = window.localStorage.getItem("whatsapp_number");
    if (savedPhone) setWhatsAppNumber(savedPhone);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) return;
        const data = await response.json();
        if (data.city) setUserCity(data.city as string);
        if (data.region) setUserRegion(data.region as string);
      } catch (error) {
        console.error("Erro ao buscar localização aproximada:", error);
      }
    };

    fetchLocation();
  }, []);

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

    const locationLabel = userCity && userRegion ? `${userCity} - ${userRegion}` : userCity ?? userRegion;
    if (locationLabel) {
      parts.push(`Vi que você é de ${locationLabel}. Também atendo aí.`);
    }

    if (quizAnswers.service) {
      parts.push(`Quero ${quizAnswers.service}.`);
    }
    if (quizAnswers.when) {
      parts.push(quizAnswers.when);
    }
    if (quizAnswers.location) {
      parts.push(quizAnswers.location);
    }

    parts.push("Podemos falar por aqui?");

    const text = parts.join(" ");
    const url = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(text)}`;
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
                {userCity && (
                  <p className="text-[11px] text-muted-foreground">
                    Percebi que você é de {userCity}
                    {userRegion ? `, ${userRegion}` : ""}. Também atendo aí.
                  </p>
                )}
                <div className="space-y-2">
                  <Button
                    className="w-full justify-start gap-2"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("service", "marcar um programa presencial")}
                  >
                    <PhoneCall className="h-4 w-4" />
                    Marcar programa presencial
                  </Button>
                  <Button
                    className="w-full justify-start gap-2"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("service", "comprar conteúdos e fotos")}
                  >
                    <Camera className="h-4 w-4" />
                    Comprar conteúdos / fotos
                  </Button>
                  <Button
                    className="w-full justify-start gap-2"
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelect("service", "fazer chamada de vídeo")}
                  >
                    <Video className="h-4 w-4" />
                    Chamada de vídeo
                  </Button>
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  2 de 3 —
                  {quizAnswers.service?.includes("programa")
                    ? " Sobre o programa"
                    : quizAnswers.service?.includes("conteúdos")
                    ? " Sobre o conteúdo"
                    : quizAnswers.service?.includes("chamada de vídeo")
                    ? " Sobre a chamada"
                    : " Próximo passo"}
                </p>
                <div className="space-y-2">
                  {quizAnswers.service?.includes("programa") && (
                    <>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("when", "Quero para agora (se possível).")}
                      >
                        Quero para agora (se possível)
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("when", "Quero ainda para hoje.")}
                      >
                        Ainda hoje
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("when", "Quero marcar para outro dia.")}
                      >
                        Outro dia, vamos marcar
                      </Button>
                    </>
                  )}

                  {quizAnswers.service?.includes("conteúdos") && (
                    <>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("when", "Quero packs de fotos.")}
                      >
                        Packs de fotos
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("when", "Quero vídeos + fotos.")}
                      >
                        Vídeos + fotos
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("when", "Quero conteúdo bem personalizado.")}
                      >
                        Conteúdo personalizado
                      </Button>
                    </>
                  )}

                  {quizAnswers.service?.includes("chamada de vídeo") && (
                    <>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("when", "Quero uma chamada rapidinha (até ~15min).")}
                      >
                        Chamada rapidinha (~15min)
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("when", "Quero uma chamada mais longa (30min+).")}
                      >
                        Chamada mais longa (30min+)
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("when", "Quero combinar direitinho a duração com você.")}
                      >
                        Vamos combinar a duração
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}

            {quizStep === 3 && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  3 de 3 —
                  {quizAnswers.service?.includes("programa")
                    ? " Onde vai ser"
                    : quizAnswers.service?.includes("conteúdos")
                    ? " Como prefere pagar"
                    : quizAnswers.service?.includes("chamada de vídeo")
                    ? " Como prefere a chamada"
                    : " Último detalhe"}
                </p>
                <div className="space-y-2">
                  {quizAnswers.service?.includes("programa") && (
                    <>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("location", "Quero que seja no meu local.")}
                      >
                        No meu local
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("location", "Prefiro que seja no seu local.")}
                      >
                        No seu local
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("location", "Podemos combinar o local certinho.")}
                      >
                        Vamos combinar o local
                      </Button>
                    </>
                  )}

                  {quizAnswers.service?.includes("conteúdos") && (
                    <>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("location", "Quero pagar via Pix.")}
                      >
                        Pagar via Pix
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("location", "Quero ver outras formas de pagamento.")}
                      >
                        Outra forma de pagamento
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("location", "Podemos combinar a forma de pagamento.")}
                      >
                        Vamos combinar na hora
                      </Button>
                    </>
                  )}

                  {quizAnswers.service?.includes("chamada de vídeo") && (
                    <>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("location", "Quero chamada com nudez.")}
                      >
                        Com nudez
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("location", "Quero chamada sem nudez.")}
                      >
                        Sem nudez
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        size="lg"
                        onClick={() => handleSelect("location", "Podemos ver os detalhes na hora.")}
                      >
                        Vamos ver na hora
                      </Button>
                    </>
                  )}
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
        <div className="relative h-40 md:h-48 w-full overflow-hidden">
          <img
            src={bannerImageUrl ?? bannerImageFallback}
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
                src={profileImageUrl ?? profileImageFallback}
                alt={`Foto de perfil de ${MODEL_NAME}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold leading-tight">
                  {MODEL_NAME} – acompanhante
                </h1>
                <Badge variant="outline" className="text-[11px] font-normal">
                  {userCity ? `Atendo em ${userCity}${userRegion ? `, ${userRegion}` : ""}` : "Atendimento discreto"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Programas presenciais (foco principal) em {userCity ?? MODEL_CITY}
              </p>
              <p className="text-xs text-muted-foreground">
                {userCity
                  ? `Atendo discretamente em ${userCity}${userRegion ? `, ${userRegion}` : ""} e região, combinando tudo direto pelo WhatsApp.`
                  : "Atendo discretamente na sua cidade e região, combinando tudo direto pelo WhatsApp."}
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
