import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Factory, Award, Globe, Wrench, TrendingUp, ShieldCheck,
  Phone, Mail, MapPin, Facebook, ExternalLink, Users, Zap,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

const CERTIFICATIONS = [
  { code: "EPA", description: "Environmental Protection Agency — norma de emisiones de EE.UU. Estándar obligatorio para exportación hacia Norteamérica.", color: "text-green-400 border-green-700/40 bg-green-900/20" },
  { code: "CARB", description: "California Air Resources Board — el estándar de emisiones más exigente de América del Norte. Vigente desde 2018.", color: "text-blue-400 border-blue-700/40 bg-blue-900/20" },
  { code: "Euro 5", description: "Norma europea de emisiones para vehículos a gasolina. Cumplimiento total en convertidores de línea Premium.", color: "text-purple-400 border-purple-700/40 bg-purple-900/20" },
  { code: "Euro 6", description: "El estándar de emisiones más estricto de la Unión Europea. Tecnología de sustrato cerámico de alta densidad.", color: "text-indigo-400 border-indigo-700/40 bg-indigo-900/20" },
  { code: "ISO 9001", description: "Sistema de gestión de calidad certificado internacionalmente. Auditoría anual por tercero independiente.", color: "text-amber-400 border-amber-700/40 bg-amber-900/20" },
  { code: "NOM-EM-167-ENER", description: "Norma Oficial Mexicana de eficiencia energética automotriz. Cumplimiento regulatorio total en México.", color: "text-red-400 border-red-700/40 bg-red-900/20" },
];

const MILESTONES = [
  { year: "2007", event: "Fundación de Daynamex en Santa Lucía Milpa Alta, Ciudad de México. Primeros 3 ingenieros especializados en catálisis automotriz." },
  { year: "2010", event: "Apertura de planta de producción en Tlalnepantla, Estado de México. Capacidad inicial de 1,500 unidades mensuales." },
  { year: "2013", event: "Primera exportación a Centroamérica. Red de 40 distribuidores en Guatemala, El Salvador y Costa Rica." },
  { year: "2016", event: "Obtención de certificación ISO 9001. Instalación de línea de producción robotizada. Capacidad aumenta a 6,000 unidades mensuales." },
  { year: "2018", event: "Certificación CARB aprobada. Expansión de planta Norte en Tlalnepantla con nueva línea de convertidores diésel." },
  { year: "2020", event: "Resistencia a la pandemia: operación continua como industria esencial. Conversión de producción parcial a kits de reparación para talleres." },
  { year: "2022", event: "Lanzamiento de la línea Premium Euro 6 para vehículos de importación europeos. Certificación EPA completada." },
  { year: "2023", event: "Construcción de hub regional en Zona Franca Coyol, Alajuela, Costa Rica. Inicio de operaciones Colombia y Ecuador." },
  { year: "2024", event: "Apertura oficial del hub Daynamex Centroamérica. 200+ SKUs en catálogo, 500+ distribuidores activos en la red." },
  { year: "2025", event: "Expansión de capacidad a 12,000 unidades/mes. Lanzamiento de programa de crédito para distribuidores mayoristas." },
];

const CAPABILITIES = [
  {
    icon: Factory,
    title: "Capacidad de Producción",
    description: "Más de 12,000 unidades mensuales entre convertidores, silenciadores y tubos de escape. Dos plantas con líneas robotizadas y control de calidad 100% automatizado en CDMX y Tlalnepantla.",
  },
  {
    icon: Wrench,
    title: "Ingeniería Propia",
    description: "Equipo de 22 ingenieros especializados en metalurgia y química de catálisis. Laboratorio propio de pruebas de emisiones conforme a norma SAE J1667.",
  },
  {
    icon: Globe,
    title: "Logística Regional",
    description: "Red de almacenes en México, Costa Rica, Colombia y Ecuador. Capacidad de distribución express a distribuidores en menos de 48 horas desde cualquier hub regional.",
  },
  {
    icon: Award,
    title: "Control de Calidad",
    description: "Cada lote es sometido a pruebas de hermeticidad, temperatura de activación y eficiencia de conversión química (>95%) antes de salir de planta. Tasa de rechazo menor al 0.3%.",
  },
  {
    icon: TrendingUp,
    title: "Crecimiento Sostenido",
    description: "Crecimiento de doble dígito en los últimos 6 años, respaldado por contratos de distribución con cadenas de refaccionarias líderes de toda Latinoamérica.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de Producto",
    description: "Garantía de fabricación de 2 años o 50,000 km en toda la línea de convertidores catalíticos. Soporte técnico post-venta directo vía WhatsApp y visita técnica.",
  },
  {
    icon: Users,
    title: "Red de Distribuidores",
    description: "500+ distribuidores activos en 5 países con programa de soporte, capacitación y materiales de punto de venta. Comunidad Daynamex con reuniones trimestrales.",
  },
  {
    icon: Zap,
    title: "Innovación Constante",
    description: "Inversión del 8% de ingresos en I+D anual. Desarrollo de nuevas líneas EV-compatible para vehículos híbridos y de gas LP en proceso para 2026.",
  },
];

const FACEBOOK_PAGES = [
  { label: "Daynamex Santa Lucía CDMX", url: "https://www.facebook.com/share/1EUhB1Vj8q/" },
  { label: "Daynamex Tlalnepantla", url: "https://www.facebook.com/share/1AN2qzLNWe/" },
  { label: "Daynamex México Oficial", url: "https://www.facebook.com/share/18b8NmqeMx/" },
];

const NUMBERS = [
  { value: "17+", label: "Años en operación" },
  { value: "12,000", label: "Unidades / mes" },
  { value: "200+", label: "SKUs en catálogo" },
  { value: "2", label: "Plantas de producción" },
  { value: "22", label: "Ingenieros especializados" },
  { value: "500+", label: "Distribuidores activos" },
];

export function About() {
  return (
    <PageLayout>
      {/* ─── HEADER ─── */}
      <section className="pt-28 pb-20 bg-gradient-to-b from-black to-background border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(32_98%_50%_/_0.08),_transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Sobre Daynamex</p>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase mb-6 leading-tight">
              Fabricamos con<br />
              <span className="text-primary">Precisión Mexicana.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
              Más de 17 años fabricando convertidores catalíticos y sistemas de escape con los más altos estándares ambientales internacionales. Desde México hacia toda Latinoamérica.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+525521787771" className="flex items-center gap-2 text-white font-bold hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +52 55 2178 7771
              </a>
              <span className="text-white/20">|</span>
              <a href="mailto:ventas@daynamex.mx" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4 text-primary" /> ventas@daynamex.mx
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── KEY NUMBERS ─── */}
      <section className="py-14 bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {NUMBERS.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <p className="text-3xl md:text-4xl font-display font-bold text-primary">{n.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{n.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION + TIMELINE ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold uppercase mb-6">Nuestra Misión</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Democratizar el acceso a tecnología de control de emisiones de clase mundial para el parque vehicular latinoamericano. Creemos que los distribuidores de la región merecen proveedores que fabriquen con los mismos estándares que Europa y Estados Unidos.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                La apertura de nuestro hub en Costa Rica no es solo una expansión geográfica: es el compromiso de construir la cadena de suministro automotriz más confiable de Centroamérica, con presencia local, inventario disponible y soporte técnico real.
              </p>

              {/* Locations */}
              <h3 className="font-display font-bold text-xl uppercase mb-5 border-t border-white/10 pt-8">Nuestras Instalaciones</h3>
              <div className="space-y-4">
                {[
                  { name: "Planta Matriz — Santa Lucía Milpa Alta", city: "Ciudad de México, CDMX", detail: "Oficinas corporativas, I+D, línea de convertidores catalíticos" },
                  { name: "Planta Norte — Tlalnepantla de Baz", city: "Estado de México", detail: "Producción de alta capacidad, sistemas de escape y silenciadores" },
                  { name: "Hub Centroamérica — Zona Franca Coyol", city: "Alajuela, Costa Rica", detail: "Centro de distribución regional, inventario para CR/GT/HN/SV/NI/PA" },
                  { name: "Oficina Comercial Colombia", city: "Bogotá D.C., Colombia", detail: "Atención a distribuidores colombianos, gestión aduanera" },
                  { name: "Oficina Comercial Ecuador", city: "Quito, Pichincha, Ecuador", detail: "Ventas y logística para distribuidores ecuatorianos" },
                ].map((loc) => (
                  <div key={loc.name} className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-white">{loc.name}</p>
                      <p className="text-xs text-primary">{loc.city}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{loc.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Historia de la empresa</h3>
              <div className="space-y-0">
                {MILESTONES.map((m, i) => (
                  <div key={m.year} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-display font-bold text-primary">{m.year.slice(2)}</span>
                      </div>
                      {i < MILESTONES.length - 1 && <div className="w-px flex-grow bg-white/10 my-1 min-h-[20px]" />}
                    </div>
                    <div className="pb-5">
                      <p className="text-xs text-primary font-bold mb-1">{m.year}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES ─── */}
      <section className="py-24 bg-black/40 border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Infraestructura</p>
            <h2 className="text-4xl font-display font-bold uppercase mb-4">Capacidades de Planta</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Infraestructura diseñada para soportar las demandas de distribuidores mayoristas a escala regional.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.07 }}
                className="bg-card/50 border border-white/10 hover:border-primary/30 transition-all rounded-xl p-6 group"
              >
                <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center mb-5 transition-colors">
                  <cap.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-base mb-3">{cap.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Normativas</p>
            <h2 className="text-4xl font-display font-bold uppercase mb-4">Certificaciones Vigentes</h2>
            <p className="text-muted-foreground max-w-2xl">
              Cada producto de la línea Daynamex cumple con las normativas ambientales internacionales más exigentes. Documentación disponible bajo solicitud para distribuidores.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.code}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`p-6 rounded-xl border ${cert.color} hover:scale-[1.01] transition-transform`}
              >
                <p className="text-2xl font-display font-bold mb-3">{cert.code}</p>
                <p className="text-sm leading-relaxed opacity-80">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL + CONTACT CTA ─── */}
      <section className="py-24 bg-black/40 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold uppercase mb-6">Síguenos en Facebook</h2>
              <p className="text-muted-foreground mb-8">Actualizaciones de productos, promociones para distribuidores y noticias de la industria automotriz.</p>
              <div className="space-y-3">
                {FACEBOOK_PAGES.map((page) => (
                  <a
                    key={page.url}
                    href={page.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/40 hover:bg-blue-900/10 transition-all group"
                  >
                    <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center shrink-0 group-hover:bg-blue-600/30 transition-colors">
                      <Facebook className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">{page.label}</p>
                      <p className="text-xs text-muted-foreground">Facebook — Daynamex</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-40 group-hover:opacity-80" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col justify-between"
            >
              <div>
                <h2 className="text-3xl font-display font-bold uppercase mb-6">Contáctanos</h2>
                <div className="space-y-5 mb-10">
                  <div className="flex items-start gap-4 p-4 bg-card/40 border border-white/10 rounded-xl">
                    <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Ventas y distribución</p>
                      <a href="tel:+525521787771" className="text-xl font-bold text-white hover:text-primary transition-colors">
                        +52 55 2178 7771
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">Lun–Vie 8:00–18:00 CST / Sáb 9:00–14:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-card/40 border border-white/10 rounded-xl">
                    <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Correo corporativo</p>
                      <a href="mailto:ventas@daynamex.mx" className="font-medium text-primary hover:text-primary/80 transition-colors">
                        ventas@daynamex.mx
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">Respuesta en menos de 4 horas hábiles</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-card/40 border border-white/10 rounded-xl">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Ubicaciones</p>
                      <p className="text-sm text-white">Santa Lucía Milpa Alta, CDMX</p>
                      <p className="text-sm text-muted-foreground">Tlalnepantla de Baz, Edo. Méx.</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="lg" asChild className="font-bold uppercase tracking-wider w-full">
                <Link href="/distribuidor">Solicitar Ser Distribuidor</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
