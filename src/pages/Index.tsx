import { useEffect } from "react";
import bannerImage from "@/assets/profile-banner.png";
import galleryImage from "@/assets/profile-gallery-1.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const MODEL_NAME = "Luna Noir";
const MODEL_HANDLE = "@luna.noir";
const MODEL_CITY = "São Paulo, SP";
const WHATSAPP_NUMBER = "5511999999999"; // Ajuste para o número da modelo

const feedbacks = [
  {
    id: 1,
    author: "Eduardo",
    rating: 5,
    text: "Experiência incrível, tudo exatamente como combinado. Super discreta e atenciosa.",
    date: "há 2 dias",
  },
  {
    id: 2,
    author: "Marcos",
    rating: 5,
    text: "Fotos compatíveis com a realidade, muito cheirosa e educada. Voltarei com certeza.",
    date: "há 1 semana",
  },
  {
    id: 3,
    author: "Rafael",
    rating: 4,
    text: "Local seguro, conversa boa e zero pressa. Valeu cada minuto.",
    date: "há 3 semanas",
  },
];

const galleryImages = [galleryImage, galleryImage, galleryImage];

const Index = () => {
  useEffect(() => {
    const title = `${MODEL_NAME} | Perfil VIP e encontros discretos`;
    document.title = title;

    const description = `Veja o perfil VIP de ${MODEL_NAME}, fotos exclusivas, feedbacks reais e agende seu encontro discreto pelo WhatsApp.`;

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
    const text = `Olá, vi seu perfil (${MODEL_NAME}) no site e gostaria de combinar um encontro. Podemos falar por aqui?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl space-y-8 fade-in-up-soft">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Perfil verificado</p>
            <h1 className="mt-1 text-2xl font-semibold text-gradient-primary">Modelo exclusiva para encontros discretos</h1>
          </div>
          <Badge className="badge-pill bg-secondary text-secondary-foreground">+18 | Conteúdo adulto</Badge>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
          <article className="space-y-6">
            <Card className="surface-card-hover overflow-hidden border border-border/80">
              <CardHeader className="relative border-b border-border/70 p-0">
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={bannerImage}
                    alt={`Banner de perfil de ${MODEL_NAME}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>

                <div className="absolute inset-x-6 bottom-[-3.75rem] flex items-end justify-between gap-4">
                  <div className="flex items-end gap-4">
                    <div className="profile-glow-ring -mb-2">
                      <div className="h-24 w-24 overflow-hidden rounded-full border border-border bg-background-soft">
                        <img
                          src={galleryImage}
                          alt={`Foto de perfil de ${MODEL_NAME}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold leading-tight">{MODEL_NAME}</h2>
                        <Badge variant="outline" className="border-primary/40 bg-background/40 text-xs text-primary">
                          VIP
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{MODEL_HANDLE}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{MODEL_CITY}</p>
                    </div>
                  </div>
                  <div className="hidden items-center gap-6 pb-3 text-sm text-muted-foreground md:flex">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Avaliação</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">4,9</span>
                        <span className="text-xs text-muted-foreground">(32 reviews)</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Encontros</p>
                      <p className="font-medium">120+ realizados</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="mt-16 space-y-6 px-6 pb-6 pt-4">
                <p className="text-sm text-muted-foreground">
                  Atendo homens respeitosos, com total discrição e segurança. Ambiente reservado na região nobre da cidade
                  ou saída mediante combinação prévia. Conversa leve, boa energia e zero pressa.
                </p>

                <div className="grid gap-4 rounded-2xl bg-background-soft/60 p-4 text-xs text-muted-foreground md:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground/70">Horários</p>
                    <p className="mt-1 font-medium text-foreground">Seg a Sáb · 18h às 2h</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground/70">Atendimento</p>
                    <p className="mt-1 font-medium text-foreground">Apenas encontros presenciais</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground/70">Zona</p>
                    <p className="mt-1 font-medium text-foreground">Zona Sul · Região nobre</p>
                  </div>
                </div>

                <section aria-label="Galeria de fotos" className="space-y-3">
                  <header className="flex items-center justify-between text-sm">
                    <h2 className="font-medium">Galeria discreta</h2>
                    <p className="text-xs text-muted-foreground">Fotos reais autorizadas pela modelo</p>
                  </header>
                  <div className="grid gap-3 md:grid-cols-3">
                    {galleryImages.map((src, index) => (
                      <button
                        key={index}
                        type="button"
                        className="group relative overflow-hidden rounded-xl border border-border/70 bg-background-soft/60 transition-transform duration-200 hover:-translate-y-1 hover:border-primary/60"
                      >
                        <img
                          src={src}
                          alt={`Foto da galeria de ${MODEL_NAME}`}
                          className="h-32 w-full object-cover transition duration-300 group-hover:scale-105 md:h-36"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </section>
              </CardContent>
            </Card>

            <section aria-label="Feedbacks reais" className="space-y-3">
              <header className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-medium">Feedbacks verificados</h2>
                  <p className="text-xs text-muted-foreground">Relatos de clientes que já encontraram com a modelo.</p>
                </div>
                <div className="hidden items-center gap-1 text-xs text-muted-foreground md:flex">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">4,9 geral</span>
                </div>
              </header>

              <div className="grid gap-3 md:grid-cols-3">
                {feedbacks.map((feedback) => (
                  <Card key={feedback.id} className="surface-card border border-border/80">
                    <CardContent className="space-y-3 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-foreground">{feedback.author}</p>
                        <span className="text-[10px] text-muted-foreground">{feedback.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-primary">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < feedback.rating ? "fill-primary" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <p className="line-clamp-4 text-xs text-muted-foreground">“{feedback.text}”</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </article>

          <aside aria-label="Painel de agendamento" className="space-y-4 lg:space-y-6">
            <Card className="surface-card-hover border border-border/80">
              <CardHeader>
                <CardTitle className="text-sm">Marcar encontro com a modelo</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Você inicia o pedido de encontro aqui e finaliza o combinado direto com a modelo pelo WhatsApp.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 text-xs text-muted-foreground">
                  <div>
                    <p className="text-muted-foreground/80">Tipo de encontro</p>
                    <p className="mt-1 font-medium text-foreground">Presencial discreto</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground/80">Região de atendimento</p>
                    <p className="mt-1 font-medium text-foreground">Zona Sul de {MODEL_CITY}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground/80">Confirmação</p>
                    <p className="mt-1 font-medium text-foreground">Detalhes combinados apenas pelo WhatsApp</p>
                  </div>
                </div>

                <div className="rounded-xl bg-background-soft/80 p-3 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">Importante</p>
                  <p className="mt-1">
                    Seja claro e respeitoso na mensagem. A modelo pode recusar pedidos que não estejam de acordo com as
                    regras dela.
                  </p>
                </div>

                <Button className="w-full" size="lg" onClick={handleWhatsAppClick}>
                  Iniciar agendamento pelo WhatsApp
                </Button>

                <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                  Ao prosseguir, você será redirecionado para o WhatsApp. Nenhum pagamento é feito pelo site, apenas a
                  visualização do perfil e feedbacks.
                </p>
              </CardContent>
            </Card>

            <Card className="surface-card border border-border/80">
              <CardContent className="space-y-2 p-4 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">Privacidade em primeiro lugar</p>
                <p>
                  Seu número não fica salvo no site. Toda conversa acontece diretamente entre você e a modelo pelo
                  WhatsApp.
                </p>
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default Index;
