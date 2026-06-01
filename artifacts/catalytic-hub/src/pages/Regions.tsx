import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle2, Facebook, ExternalLink, Globe } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useListRegions, getListRegionsQueryKey, useGetDistributorStats, getGetDistributorStatsQueryKey } from "@workspace/api-client-react";

const FLAG_EMOJI: Record<string, string> = {
  MX: "🇲🇽",
  CR: "🇨🇷",
  CO: "🇨🇴",
  EC: "🇪🇨",
  GT: "🌎",
};

const FACEBOOK_PAGES = [
  { label: "Daynamex Santa Lucía CDMX", url: "https://www.facebook.com/share/1EUhB1Vj8q/" },
  { label: "Daynamex Tlalnepantla", url: "https://www.facebook.com/share/1AN2qzLNWe/" },
  { label: "Daynamex México Oficial", url: "https://www.facebook.com/share/18b8NmqeMx/" },
];

const CENTROAMERICA_COVERAGE = [
  { code: "GT", name: "Guatemala", phone: "+502 5555 0133", note: "Distribución desde hub Costa Rica" },
  { code: "HN", name: "Honduras", phone: "+504 9999 0144", note: "Entrega 3–4 días hábiles" },
  { code: "SV", name: "El Salvador", phone: "+503 7777 0155", note: "Entrega 2–3 días hábiles" },
  { code: "NI", name: "Nicaragua", phone: "+505 8888 0166", note: "Entrega 3–4 días hábiles" },
  { code: "PA", name: "Panamá", phone: "+507 6666 0177", note: "Entrega 2–3 días hábiles" },
  { code: "BZ", name: "Belice", phone: "+501 600 0188", note: "Entrega 4–5 días hábiles" },
];

const FLAG_CA: Record<string, string> = {
  GT: "🇬🇹",
  HN: "🇭🇳",
  SV: "🇸🇻",
  NI: "🇳🇮",
  PA: "🇵🇦",
  BZ: "🇧🇿",
};

function StatBadge({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center px-4 py-3 bg-black/30 rounded-md border border-white/10">
      <p className="text-2xl font-display font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  );
}

export function Regions() {
  const { data: regions = [], isLoading } = useListRegions({
    query: { queryKey: getListRegionsQueryKey() },
  });

  const { data: stats } = useGetDistributorStats({
    query: { queryKey: getGetDistributorStatsQueryKey() },
  });

  return (
    <PageLayout>
      {/* ─── HEADER ─── */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-black to-background border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Cobertura Regional</p>
            <h1 className="text-5xl md:text-6xl font-display font-bold uppercase mb-6">
              Nuestra Red en<br />
              <span className="text-primary">Latinoamérica</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Daynamex opera con fábrica en México, hub regional en Costa Rica y distribución directa en Colombia, Ecuador y toda Centroamérica.
            </p>
          </motion.div>

          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 grid grid-cols-3 gap-4 max-w-lg"
            >
              <StatBadge label="Distribuidores" value={stats.approved} />
              <StatBadge label="Solicitudes" value={stats.total} />
              <StatBadge label="Países activos" value={5} />
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── DB REGIONS (MX, CR, CO, EC) ─── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl font-display font-bold uppercase mb-2">Presencia Directa</h2>
            <p className="text-muted-foreground">Oficinas, bodegas y representantes comerciales en cada región.</p>
          </motion.div>

          <div className="space-y-6">
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-52 bg-white/5 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              regions.map((region, i) => (
                <motion.div
                  key={region.code}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="bg-card/50 border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-[180px,1fr,auto] gap-0">
                        {/* Country marker */}
                        <div className="bg-black/40 p-8 flex flex-col items-center justify-center border-r border-white/10">
                          <span className="text-5xl mb-3">{FLAG_EMOJI[region.code] ?? "🌐"}</span>
                          <p className="font-display font-bold text-xl text-white uppercase tracking-wide">{region.code}</p>
                          <p className="text-xs text-muted-foreground mt-1">{region.currency}</p>
                          {region.isActive && (
                            <div className="mt-3 flex items-center gap-1.5 text-xs text-green-400">
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                              Operativo
                            </div>
                          )}
                        </div>

                        {/* Region details */}
                        <div className="p-8">
                          <h2 className="text-2xl font-display font-bold mb-6">{region.name}</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                                <Phone className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Teléfono</p>
                                <a href={`tel:${region.phone.replace(/\s/g, "")}`} className="font-medium hover:text-primary transition-colors text-sm">
                                  {region.phone}
                                </a>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                                <Mail className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                                <a href={`mailto:${region.email}`} className="font-medium text-primary hover:underline text-sm">
                                  {region.email}
                                </a>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                                <MapPin className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Dirección</p>
                                <p className="font-medium text-sm">{region.address}</p>
                              </div>
                            </div>

                            {region.distributionTime && (
                              <div className="flex items-start gap-3">
                                <div className="w-9 h-9 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                                  <Clock className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tiempo de Distribución</p>
                                  <p className="font-display font-bold text-primary">{region.distributionTime}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Mexico-specific: Facebook pages */}
                          {region.code === "MX" && (
                            <div className="mt-6 pt-6 border-t border-white/10">
                              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Redes Sociales</p>
                              <div className="flex flex-wrap gap-2">
                                {FACEBOOK_PAGES.map((page) => (
                                  <a
                                    key={page.url}
                                    href={page.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-900/20 border border-blue-700/30 rounded-lg text-blue-400 text-xs font-medium hover:bg-blue-900/30 transition-colors"
                                  >
                                    <Facebook className="w-3.5 h-3.5" />
                                    {page.label}
                                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* WhatsApp CTA */}
                        {region.whatsapp && (
                          <div className="p-8 flex items-center border-t md:border-t-0 md:border-l border-white/10">
                            <a
                              href={`https://wa.me/${region.whatsapp.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center gap-3 group"
                            >
                              <div className="w-14 h-14 bg-green-700/20 border border-green-700/40 rounded-full flex items-center justify-center group-hover:bg-green-700/40 transition-colors">
                                <MessageCircle className="w-7 h-7 text-green-400" />
                              </div>
                              <p className="text-xs text-center text-muted-foreground group-hover:text-green-400 transition-colors font-medium">
                                WhatsApp<br />directo
                              </p>
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ─── CENTROAMÉRICA COVERAGE ─── */}
      <section className="py-20 bg-black/40 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <p className="text-primary text-xs font-bold uppercase tracking-widest">Distribución Regional</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase mb-4">
              Cobertura Centroamérica
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Desde nuestro hub en Zona Franca Coyol, Costa Rica, distribuimos a todos los países de Centroamérica. Contacta la central de Costa Rica para pedidos y logística regional.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm font-medium">+506 8800 2090</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <a href="mailto:cr@daynamex.mx" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  cr@daynamex.mx
                </a>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CENTROAMERICA_COVERAGE.map((country, i) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card/40 border border-white/10 hover:border-primary/30 rounded-xl p-5 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{FLAG_CA[country.code]}</span>
                  <div>
                    <p className="font-display font-bold text-white">{country.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400">Cobertura activa</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                    <a href={`tel:${country.phone.replace(/\s/g, "")}`} className="text-muted-foreground hover:text-white transition-colors">
                      {country.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{country.note}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BY REGION ─── */}
      {stats && stats.byRegion.length > 0 && (
        <section className="py-16 bg-background border-t border-white/10">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-display font-bold uppercase mb-8 text-center">Distribuidores Registrados por País</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {stats.byRegion.map((r) => (
                <div key={r.country} className="flex items-center gap-3 bg-card/50 border border-white/10 rounded-xl px-6 py-4">
                  <span className="text-2xl">{FLAG_EMOJI[r.country] ?? "🌐"}</span>
                  <div>
                    <p className="font-display font-bold text-2xl text-primary">{r.count}</p>
                    <p className="text-xs text-muted-foreground">{r.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="py-20 bg-primary/10 border-t border-primary/20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase mb-4">
              ¿Listo para distribuir en tu región?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Aplica como distribuidor mayorista y empieza a vender productos Daynamex en tu mercado. Proceso rápido, soporte desde el primer día.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="font-bold uppercase tracking-wider py-6 px-10">
                <Link href="/distribuidor">Aplicar como Distribuidor</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/20 py-6 px-10">
                <a href="mailto:ventas@daynamex.mx">ventas@daynamex.mx</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
