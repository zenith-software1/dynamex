import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ChevronRight, Globe, TrendingUp, ShieldCheck, Factory,
  Phone, Mail, Facebook, Award, Wrench, Package, Truck,
  HeadphonesIcon, BarChart3, CheckCircle2, Star, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageLayout } from "@/components/PageLayout";
import { useGetFeaturedProducts, getGetFeaturedProductsQueryKey } from "@workspace/api-client-react";

const SUPPORTED_COUNTRIES = [
  {
    code: "MX",
    name: "México",
    phone: "+52 55 2178 7771",
    email: "ventas@daynamex.mx",
    time: "24 hrs",
    address: "Santa Lucía Milpa Alta, CDMX / Tlalnepantla, Edo. Méx.",
    whatsapp: "525521787771",
  },
  {
    code: "CR",
    name: "Costa Rica",
    phone: "+506 8800 2090",
    email: "cr@daynamex.mx",
    time: "24–48 hrs",
    address: "Zona Franca Coyol, Alajuela, Costa Rica",
    whatsapp: "50688002090",
  },
  {
    code: "CO",
    name: "Colombia",
    phone: "+57 310 555 0192",
    email: "colombia@daynamex.mx",
    time: "3–5 días hábiles",
    address: "Bogotá D.C., Colombia",
    whatsapp: "573105550192",
  },
  {
    code: "EC",
    name: "Ecuador",
    phone: "+593 99 555 0174",
    email: "ecuador@daynamex.mx",
    time: "3–5 días hábiles",
    address: "Quito, Pichincha, Ecuador",
    whatsapp: "593995550174",
  },
  {
    code: "GT",
    name: "Centroamérica",
    phone: "+502 5555 0133",
    email: "centroamerica@daynamex.mx",
    time: "2–4 días hábiles",
    address: "Ciudad de Guatemala / Costa Rica (hub regional)",
    whatsapp: "50255550133",
  },
];

const STATS = [
  { value: "17+", label: "Años de experiencia" },
  { value: "12K+", label: "Unidades / mes" },
  { value: "200+", label: "Modelos en catálogo" },
  { value: "5", label: "Países con cobertura" },
  { value: "500+", label: "Distribuidores activos" },
  { value: "6", label: "Certificaciones internacionales" },
];

const BENEFITS = [
  {
    icon: Package,
    title: "Stock Garantizado",
    desc: "Inventario permanente en nuestros hubs de México, Costa Rica y Colombia. Sin esperas, pedidos de hasta 5,000 unidades disponibles en 24h.",
  },
  {
    icon: Truck,
    title: "Logística Regional Propia",
    desc: "Flota propia y alianzas con carriers regionales para entregas express. Rastreo en tiempo real de cada despacho.",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte Técnico Especializado",
    desc: "Equipo de 22 ingenieros con capacitación directa a tu personal. Asistencia post-venta por WhatsApp, teléfono y visita técnica.",
  },
  {
    icon: BarChart3,
    title: "Precios Mayoristas Competitivos",
    desc: "Márgenes de hasta 40% para distribuidores calificados. Descuentos por volumen desde 50 unidades mensuales.",
  },
  {
    icon: Award,
    title: "Garantía de Fábrica 2 Años",
    desc: "Garantía de fabricación de 2 años o 50,000 km en toda la línea. Reposición directa sin costo si el defecto es de origen.",
  },
  {
    icon: Wrench,
    title: "Capacitación sin Costo",
    desc: "Talleres y cursos de instalación gratuitos para el equipo técnico de tu negocio. Certificación Daynamex disponible.",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Aplica en línea", desc: "Llena el formulario B2B con los datos de tu empresa. Sin papeleo, en menos de 5 minutos." },
  { num: "02", title: "Revisión en 48h", desc: "Nuestro equipo comercial evalúa tu perfil y te contacta para agendar una videollamada." },
  { num: "03", title: "Contrato y crédito", desc: "Firmamos convenio de distribución y analizamos línea de crédito según tu historial." },
  { num: "04", title: "Primer pedido", desc: "Recibe tu primer despacho con materiales de venta, fichas técnicas y soporte de activación." },
];

const FACEBOOK_PAGES = [
  { label: "Daynamex Santa Lucía CDMX", url: "https://www.facebook.com/share/1EUhB1Vj8q/" },
  { label: "Daynamex Tlalnepantla", url: "https://www.facebook.com/share/1AN2qzLNWe/" },
  { label: "Daynamex México Oficial", url: "https://www.facebook.com/share/18b8NmqeMx/" },
];

const FLAG_EMOJI: Record<string, string> = {
  MX: "🇲🇽",
  CR: "🇨🇷",
  CO: "🇨🇴",
  EC: "🇪🇨",
  GT: "🌎",
};

export function Home() {
  const [selectedCountry, setSelectedCountry] = useState("MX");
  const countryData = SUPPORTED_COUNTRIES.find((c) => c.code === selectedCountry);

  const { data: featuredProducts = [], isLoading: isLoadingFeatured } = useGetFeaturedProducts({
    query: { queryKey: getGetFeaturedProductsQueryKey() },
  });

  return (
    <PageLayout>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
        <div className="absolute inset-0 bg-[url('/images/factory-hero.png')] bg-cover bg-center" />

        <div className="container mx-auto px-4 md:px-8 relative z-20 pt-20 pb-16">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium tracking-wide">EXPANSIÓN LATAM — DISTRIBUIDORES MAYORISTAS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] text-white mb-6 uppercase"
            >
              Precisión Industrial.<br />
              <span className="text-primary">Alcance Global.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-4 leading-relaxed"
            >
              Daynamex es el fabricante líder de convertidores catalíticos y sistemas de escape en México. Calidad de exportación para la industria automotriz en Centro y Sudamérica.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 mb-10"
            >
              <a
                href="tel:+525521787771"
                className="flex items-center gap-2 text-primary font-bold text-lg hover:text-primary/80 transition-colors"
              >
                <Phone className="w-5 h-5" /> +52 55 2178 7771
              </a>
              <span className="text-white/30">|</span>
              <a
                href="mailto:ventas@daynamex.mx"
                className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4" /> ventas@daynamex.mx
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" asChild className="text-base font-bold tracking-wide py-6 px-8 bg-primary text-black hover:bg-primary/90">
                <Link href="/distribuidor">CONVERTIRSE EN DISTRIBUIDOR</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base font-bold tracking-wide py-6 px-8 border-white/30 hover:bg-white/10">
                <Link href="/catalogo">VER CATÁLOGO TÉCNICO <ChevronRight className="w-5 h-5 ml-1" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-primary animate-pulse" />
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="py-10 bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <p className="text-3xl md:text-4xl font-display font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COUNTRY SELECTOR ─── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Cobertura Regional</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 uppercase">Atención Localizada en 5 Países</h2>
            <p className="text-muted-foreground">Selecciona tu región para ver información de contacto, dirección y tiempos de distribución.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-card border border-white/10 rounded-xl p-6 md:p-10 shadow-2xl"
          >
            <div className="mb-8">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Seleccionar País / Región</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full h-14 px-4 bg-background border border-white/10 rounded-md text-base text-foreground focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
              >
                {SUPPORTED_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {countryData && (
              <motion.div
                key={countryData.code}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-6 border-t border-white/10 space-y-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{FLAG_EMOJI[countryData.code]}</span>
                  <div>
                    <p className="font-display font-bold text-xl text-white">{countryData.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-green-400 font-medium">Operativo</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Teléfono</p>
                      <a href={`tel:${countryData.phone.replace(/\s/g, "")}`} className="font-medium text-white hover:text-primary transition-colors text-sm">
                        {countryData.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</p>
                      <a href={`mailto:${countryData.email}`} className="font-medium text-primary hover:text-primary/80 transition-colors text-sm">
                        {countryData.email}
                      </a>
                    </div>
                  </div>
                  <div className="sm:col-span-2 flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <Globe className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Ubicación</p>
                      <p className="font-medium text-white text-sm">{countryData.address}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Tiempo de distribución</p>
                    <p className="text-xl font-display font-bold text-primary">{countryData.time}</p>
                  </div>
                  <a
                    href={`https://wa.me/${countryData.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-700/20 border border-green-700/40 rounded-lg text-green-400 text-sm font-medium hover:bg-green-700/30 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    WhatsApp directo
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>

          <div className="mt-8 text-center">
            <Link href="/regiones" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
              Ver todas las regiones con información completa <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Productos Estrella</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4">Ingeniería Destacada</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Los convertidores y sistemas más solicitados por mayoristas de la región, certificados para cumplir los estándares más exigentes.
              </p>
            </div>
            <Button variant="outline" asChild className="shrink-0">
              <Link href="/catalogo">Ver todo el catálogo <ChevronRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>

          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-white/5 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.slice(0, 3).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full bg-card/50 border-white/5 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-black to-card/80 p-8 relative">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center rounded-lg">
                          <Factory className="w-14 h-14 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-primary text-black text-[10px] font-bold px-2.5 py-1 uppercase rounded-sm tracking-wider">
                        {product.category.replace(/_/g, " ")}
                      </div>
                      <div className="absolute top-3 right-3 bg-black/60 border border-white/10 text-[10px] px-2 py-0.5 rounded text-muted-foreground font-mono">
                        {product.sku}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold font-display mb-2 leading-tight">{product.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-5 leading-relaxed">{product.description}</p>
                      <Button variant="link" className="px-0 text-primary hover:text-primary/80 text-sm" asChild>
                        <Link href="/catalogo">Especificaciones técnicas <ChevronRight className="w-4 h-4 ml-1" /></Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="py-24 bg-black/40 border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Por qué elegirnos</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4">Ventajas Daynamex</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No solo fabricamos. Construimos asociaciones comerciales de largo plazo con distribuidores mayoristas en toda la región.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="bg-card/40 border border-white/10 hover:border-primary/40 rounded-xl p-6 group transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center mb-5 transition-colors">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Proceso</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4">Cómo Convertirse en Distribuidor</h2>
            <p className="text-muted-foreground max-w-xl">
              El proceso de incorporación es rápido y sin burocracia. De la solicitud a la primera entrega en menos de dos semanas.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-card/30 border border-white/10 rounded-xl p-6 h-full">
                  <div className="text-5xl font-display font-bold text-primary/20 mb-4 leading-none">{s.num}</div>
                  <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-primary/30 z-10" />
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" asChild className="font-bold uppercase tracking-wider py-6 px-12">
              <Link href="/distribuidor">Iniciar solicitud ahora <ChevronRight className="w-5 h-5 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── TRUST MARKERS + CONTACT ─── */}
      <section className="py-20 bg-black border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-16">
            {[
              { icon: ShieldCheck, title: "Certificación Global", desc: "EPA, CARB, Euro 5/6, ISO 9001 y NOM-EM-167-ENER vigentes en toda la línea." },
              { icon: Factory, title: "Fábrica Propia", desc: "Planta robotizada en CDMX y Tlalnepantla. Hub regional en Zona Franca Coyol, Costa Rica." },
              { icon: TrendingUp, title: "Red Mayorista Activa", desc: "500+ distribuidores activos en 5 países con crecimiento de doble dígito en los últimos 3 años." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-5">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold uppercase mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact + Social */}
          <div className="max-w-4xl mx-auto border-t border-white/10 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-display font-bold text-2xl uppercase mb-6">Contacto Directo</h3>
                <div className="space-y-4">
                  <a href="tel:+525521787771" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Ventas y Distribución</p>
                      <p className="font-bold text-lg text-white group-hover:text-primary transition-colors">+52 55 2178 7771</p>
                    </div>
                  </a>
                  <a href="mailto:ventas@daynamex.mx" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Email Corporativo</p>
                      <p className="font-medium text-primary group-hover:text-primary/80 transition-colors">ventas@daynamex.mx</p>
                    </div>
                  </a>
                </div>
                <div className="mt-8">
                  <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg inline-flex">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Atención de Lunes a Sábado</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl uppercase mb-6">Redes Sociales</h3>
                <div className="space-y-3">
                  {FACEBOOK_PAGES.map((page) => (
                    <a
                      key={page.url}
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:border-blue-500/40 hover:bg-blue-900/10 transition-all group"
                    >
                      <Facebook className="w-5 h-5 text-blue-400 group-hover:text-blue-300 shrink-0" />
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors">{page.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-40 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild className="w-full font-bold uppercase tracking-wider">
                    <Link href="/distribuidor">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Aplicar como Distribuidor
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
