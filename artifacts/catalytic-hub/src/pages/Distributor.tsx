import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  CheckCircle2, ChevronRight, ChevronLeft, AlertCircle, Users,
  Package, Truck, HeadphonesIcon, Award, BarChart3, Wrench,
  Phone, Mail, Facebook, ExternalLink,
} from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useCreateDistributor,
  useGetDistributorStats,
  getGetDistributorStatsQueryKey,
} from "@workspace/api-client-react";

const COUNTRIES = [
  { value: "MX", label: "México" },
  { value: "CR", label: "Costa Rica" },
  { value: "CO", label: "Colombia" },
  { value: "EC", label: "Ecuador" },
  { value: "GT", label: "Guatemala" },
  { value: "HN", label: "Honduras" },
  { value: "SV", label: "El Salvador" },
  { value: "NI", label: "Nicaragua" },
  { value: "PA", label: "Panamá" },
  { value: "BZ", label: "Belice" },
  { value: "OTRO", label: "Otro país" },
];

const BUSINESS_TYPES = [
  { value: "refaccionaria", label: "Refaccionaria / Autopartes", description: "Tienda especializada en repuestos automotrices al menudeo o mayoreo" },
  { value: "taller", label: "Taller Mecánico", description: "Taller de instalación, servicio y mantenimiento automotriz" },
  { value: "distribuidor_mayorista", label: "Distribuidor Mayorista", description: "Distribución a revendedores, cadenas de talleres o empresas de flota" },
  { value: "otro", label: "Otro modelo de negocio", description: "Importador, exportador u otro perfil comercial" },
];

const VOLUMES = [
  { value: "menos_50", label: "Menos de 50 unidades/mes" },
  { value: "cincuenta_200", label: "50 – 200 unidades/mes" },
  { value: "doscientos_500", label: "200 – 500 unidades/mes" },
  { value: "mas_500", label: "Más de 500 unidades/mes" },
];

const BENEFITS = [
  { icon: Package, title: "Stock garantizado", desc: "Inventario permanente en México, Costa Rica y Colombia." },
  { icon: Truck, title: "Envío en 24–48h", desc: "Despacho express desde el hub más cercano a tu región." },
  { icon: HeadphonesIcon, title: "Soporte técnico", desc: "Asesoría directa de nuestros ingenieros especializados." },
  { icon: BarChart3, title: "Precios mayoristas", desc: "Márgenes de hasta 40% para volúmenes calificados." },
  { icon: Award, title: "Garantía 2 años", desc: "Reposición directa sin costo por defecto de fabricación." },
  { icon: Wrench, title: "Capacitación gratis", desc: "Talleres de instalación y certificación Dynamex." },
];

const FACEBOOK_PAGES = [
  { label: "Dynamex Santa Lucía CDMX", url: "https://www.facebook.com/share/1EUhB1Vj8q/" },
  { label: "Dynamex Tlalnepantla", url: "https://www.facebook.com/share/1AN2qzLNWe/" },
  { label: "Dynamex México Oficial", url: "https://www.facebook.com/share/18b8NmqeMx/" },
];

const step1Schema = z.object({
  companyName: z.string().min(2, "Mínimo 2 caracteres").max(200),
  contactName: z.string().min(2, "Mínimo 2 caracteres").max(100),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Mínimo 7 dígitos").max(20),
});

const step2Schema = z.object({
  country: z.string().min(1, "Selecciona un país"),
  city: z.string().min(2, "Ciudad requerida").max(100),
  businessType: z.enum(["refaccionaria", "taller", "distribuidor_mayorista", "otro"]),
  estimatedMonthlyVolume: z.enum(["menos_50", "cincuenta_200", "doscientos_500", "mas_500"]),
});

const step3Schema = z.object({
  taxId: z.string().optional(),
  message: z.string().max(1000).optional(),
});

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type FormData = z.infer<typeof fullSchema>;

const STEP_SCHEMAS = [step1Schema, step2Schema, step3Schema];
const STEP_TITLES = ["Datos de Contacto", "Tu Negocio", "Información Adicional"];

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full h-11 px-3 bg-background border border-white/10 rounded-md text-sm focus:outline-none focus:border-primary/60 transition-colors placeholder:text-muted-foreground/50";

export function Distributor() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedCompany, setSubmittedCompany] = useState("");

  const { data: stats } = useGetDistributorStats({
    query: { queryKey: getGetDistributorStatsQueryKey() },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: "onBlur",
  });

  const mutation = useCreateDistributor();
  const watchedBusinessType = watch("businessType");
  const watchedVolume = watch("estimatedMonthlyVolume");

  const nextStep = async () => {
    const fields = Object.keys(STEP_SCHEMAS[step].shape) as (keyof FormData)[];
    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = (data: FormData) => {
    mutation.mutate(
      {
        data: {
          companyName: data.companyName,
          contactName: data.contactName,
          email: data.email,
          phone: data.phone,
          country: data.country,
          city: data.city,
          businessType: data.businessType,
          estimatedMonthlyVolume: data.estimatedMonthlyVolume,
          taxId: data.taxId || undefined,
          message: data.message || undefined,
        },
      },
      {
        onSuccess: () => {
          setSubmittedCompany(data.companyName);
          setSubmitted(true);
        },
      }
    );
  };

  if (submitted) {
    return (
      <PageLayout>
        <div className="flex-grow flex items-center justify-center py-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg"
          >
            <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-display font-bold mb-4">Solicitud Enviada</h2>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Hemos recibido la solicitud de <span className="text-white font-medium">{submittedCompany}</span>. Nuestro equipo comercial Dynamex revisará tu perfil y se pondrá en contacto en un plazo de 24–48 horas hábiles.
            </p>
            <p className="text-sm text-muted-foreground/70 mb-3">
              Revisa tu bandeja de entrada (y spam) para la confirmación.
            </p>
            <p className="text-sm text-muted-foreground/70 mb-10">
              También puedes escribirnos directamente a{" "}
              <a href="mailto:ventas@Dynamex.mx" className="text-primary hover:underline">ventas@Dynamex.mx</a>
              {" "}o llamar al{" "}
              <a href="tel:+525521787771" className="text-primary hover:underline">+52 55 2178 7771</a>.
            </p>
            <Button onClick={() => { setSubmitted(false); setStep(0); }} variant="outline" className="border-white/20">
              Enviar otra solicitud
            </Button>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* ─── HEADER ─── */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-black to-background border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Portal B2B — Dynamex</p>
              <h1 className="text-5xl md:text-6xl font-display font-bold uppercase mb-6">
                Aplica para ser<br />
                <span className="text-primary">Distribuidor</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl mb-6">
                Forma parte de la red de distribución mayorista Dynamex en México, Centroamérica, Colombia y Ecuador. Llena el formulario y nuestro equipo te contacta en menos de 48 horas.
              </p>

              {stats && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-muted-foreground mb-8"
                >
                  <Users className="w-4 h-4 text-primary" />
                  <span>
                    <span className="text-white font-bold">{stats.approved}</span> distribuidores aprobados en la red
                  </span>
                </motion.div>
              )}

              {/* Benefits grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                      <b.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">{b.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-4 lg:pt-4"
            >
              <div className="bg-card/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-display font-bold text-lg uppercase mb-5">Contacto Directo</h3>
                <div className="space-y-4">
                  <a href="tel:+525521787771" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Ventas mayoristas</p>
                      <p className="font-bold text-white group-hover:text-primary transition-colors">+52 55 2178 7771</p>
                    </div>
                  </a>
                  <a href="mailto:ventas@Dynamex.mx" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Email corporativo</p>
                      <p className="font-medium text-primary">ventas@Dynamex.mx</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/525521787771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-700/30 rounded-lg hover:bg-green-900/30 transition-colors group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-400"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-400 group-hover:text-green-300 transition-colors">WhatsApp Ventas</p>
                      <p className="text-xs text-muted-foreground">Respuesta inmediata en horario laboral</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-card/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-display font-bold text-sm uppercase mb-4 text-muted-foreground tracking-wider">Síguenos</h3>
                <div className="space-y-2">
                  {FACEBOOK_PAGES.map((page) => (
                    <a
                      key={page.url}
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <Facebook className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">{page.label}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-40 group-hover:opacity-80" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="py-20 bg-background flex-grow">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-10">
              {STEP_TITLES.map((title, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all shrink-0 ${
                      i < step
                        ? "bg-primary text-black"
                        : i === step
                        ? "bg-primary/20 border-2 border-primary text-primary"
                        : "bg-white/5 border border-white/20 text-muted-foreground"
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
                    {title}
                  </span>
                  {i < STEP_TITLES.length - 1 && (
                    <div className={`h-px flex-1 mx-2 ${i < step ? "bg-primary/50" : "bg-white/10"}`} />
                  )}
                </div>
              ))}
            </div>

            <Card className="bg-card/50 border-white/10">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    {/* ── Step 1: Contact info ── */}
                    {step === 0 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-display font-bold mb-6">{STEP_TITLES[0]}</h2>

                        <FormField label="Nombre de la empresa *" error={errors.companyName?.message}>
                          <input
                            {...register("companyName")}
                            placeholder="Refaccionaria La Estrella S.A."
                            className={inputClass}
                          />
                        </FormField>

                        <FormField label="Nombre del contacto principal *" error={errors.contactName?.message}>
                          <input
                            {...register("contactName")}
                            placeholder="Carlos Rodríguez"
                            className={inputClass}
                          />
                        </FormField>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField label="Email corporativo *" error={errors.email?.message}>
                            <input
                              {...register("email")}
                              type="email"
                              placeholder="contacto@empresa.com"
                              className={inputClass}
                            />
                          </FormField>
                          <FormField label="Teléfono / WhatsApp *" error={errors.phone?.message}>
                            <input
                              {...register("phone")}
                              placeholder="+52 55 0000 0000"
                              className={inputClass}
                            />
                          </FormField>
                        </div>

                        <div className="flex justify-end pt-4">
                          <Button type="button" onClick={nextStep} className="font-bold uppercase tracking-wider">
                            Siguiente <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step 2: Business info ── */}
                    {step === 1 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-display font-bold mb-6">{STEP_TITLES[1]}</h2>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField label="País *" error={errors.country?.message}>
                            <select {...register("country")} className={inputClass + " cursor-pointer"}>
                              <option value="">Seleccionar...</option>
                              {COUNTRIES.map((c) => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                              ))}
                            </select>
                          </FormField>
                          <FormField label="Ciudad *" error={errors.city?.message}>
                            <input
                              {...register("city")}
                              placeholder="Ciudad de México"
                              className={inputClass}
                            />
                          </FormField>
                        </div>

                        <FormField label="Tipo de negocio *" error={errors.businessType?.message}>
                          <div className="space-y-2">
                            {BUSINESS_TYPES.map((bt) => (
                              <button
                                key={bt.value}
                                type="button"
                                onClick={() => setValue("businessType", bt.value as FormData["businessType"], { shouldValidate: true })}
                                className={`w-full text-left p-4 rounded-lg border transition-all ${
                                  watchedBusinessType === bt.value
                                    ? "border-primary bg-primary/10 text-white"
                                    : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/30"
                                }`}
                              >
                                <p className="font-medium text-sm">{bt.label}</p>
                                <p className="text-xs mt-0.5 opacity-70">{bt.description}</p>
                              </button>
                            ))}
                          </div>
                        </FormField>

                        <FormField label="Volumen mensual estimado *" error={errors.estimatedMonthlyVolume?.message}>
                          <div className="grid grid-cols-2 gap-2">
                            {VOLUMES.map((v) => (
                              <button
                                key={v.value}
                                type="button"
                                onClick={() => setValue("estimatedMonthlyVolume", v.value as FormData["estimatedMonthlyVolume"], { shouldValidate: true })}
                                className={`p-3 rounded-md border text-sm text-left transition-all ${
                                  watchedVolume === v.value
                                    ? "border-primary bg-primary/10 text-white"
                                    : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/30"
                                }`}
                              >
                                {v.label}
                              </button>
                            ))}
                          </div>
                        </FormField>

                        <div className="flex justify-between pt-4">
                          <Button type="button" variant="outline" onClick={() => setStep(0)} className="border-white/20">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Atrás
                          </Button>
                          <Button type="button" onClick={nextStep} className="font-bold uppercase tracking-wider">
                            Siguiente <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step 3: Additional info ── */}
                    {step === 2 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-display font-bold mb-2">{STEP_TITLES[2]}</h2>
                        <p className="text-sm text-muted-foreground mb-6">Esta información es opcional pero nos ayuda a ofrecerte mejores condiciones comerciales desde el inicio.</p>

                        <FormField label="RFC / RUC / NITE / NIT (opcional)" error={errors.taxId?.message}>
                          <input
                            {...register("taxId")}
                            placeholder="Número de identificación fiscal"
                            className={inputClass}
                          />
                        </FormField>

                        <FormField label="Cuéntanos sobre tu negocio (opcional)" error={errors.message?.message}>
                          <textarea
                            {...register("message")}
                            rows={5}
                            placeholder="Descripción de tu empresa, experiencia en el sector automotriz, marcas que manejas actualmente, número de puntos de venta, o cualquier pregunta que tengas para nuestro equipo comercial..."
                            className={inputClass + " h-auto py-3 resize-none"}
                          />
                        </FormField>

                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm text-muted-foreground">
                          Al enviar esta solicitud, nuestro equipo comercial Dynamex revisará tu perfil en un plazo de 24–48 horas hábiles y se pondrá en contacto vía email o WhatsApp para continuar el proceso.
                        </div>

                        {mutation.isError && (
                          <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/30 rounded-md text-sm text-destructive">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            Error al enviar la solicitud. Por favor intenta de nuevo o escríbenos a ventas@Dynamex.mx
                          </div>
                        )}

                        <div className="flex justify-between pt-4">
                          <Button type="button" variant="outline" onClick={() => setStep(1)} className="border-white/20">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Atrás
                          </Button>
                          <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="font-bold uppercase tracking-wider px-8"
                          >
                            {mutation.isPending ? "Enviando..." : "Enviar Solicitud"}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Pré-qualification notes */}
            <div className="mt-8 p-5 bg-card/30 border border-white/10 rounded-xl">
              <h4 className="font-display font-bold text-sm uppercase mb-3 text-primary tracking-wider">Perfil ideal de distribuidor</h4>
              <ul className="space-y-2">
                {[
                  "Empresa constituida legalmente con actividad comercial activa en el sector automotriz",
                  "Capacidad de compra mínima de 50 unidades mensuales (negociable según región)",
                  "Punto de venta físico, taller mecánico o canal de distribución establecido",
                  "Equipo técnico disponible para capacitación Dynamex",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom CTA links */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              ¿Tienes dudas? Escríbenos a{" "}
              <a href="mailto:ventas@Dynamex.mx" className="text-primary hover:underline">ventas@Dynamex.mx</a>
              {" "}o llama al{" "}
              <a href="tel:+525521787771" className="text-primary hover:underline">+52 55 2178 7771</a>
            </div>

            {/* See catalog */}
            <div className="mt-8 text-center">
              <Link href="/catalogo" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                Ver catálogo completo de productos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
