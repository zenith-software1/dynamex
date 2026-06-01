import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, ExternalLink } from "lucide-react";

const FACEBOOK_PAGES = [
  { label: "Dynamex Santa Lucía CDMX", url: "https://www.facebook.com/share/1EUhB1Vj8q/" },
  { label: "Dynamex Tlalnepantla", url: "https://www.facebook.com/share/1AN2qzLNWe/" },
  { label: "Dynamex México Oficial", url: "https://www.facebook.com/share/18b8NmqeMx/" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-primary flex items-center justify-center font-display font-bold text-lg rounded-sm text-black">
                D
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-2xl tracking-tight text-white">Dynamex</span>
                <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-medium">Convertidores &amp; Escape</span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              Fabricante y distribuidor líder de convertidores catalíticos y sistemas de escape. Más de 17 años de precisión industrial con alcance en toda América Latina.
            </p>
            {/* Social media */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Síguenos en Facebook</p>
              {FACEBOOK_PAGES.map((page) => (
                <a
                  key={page.url}
                  href={page.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Facebook className="w-4 h-4 text-blue-400 group-hover:text-blue-300 shrink-0" />
                  <span>{page.label}</span>
                  <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-80" />
                </a>
              ))}
            </div>
          </div>

          {/* Links column */}
          <div>
            <h4 className="font-display font-bold text-white mb-5 uppercase tracking-wider text-sm">Navegación</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Inicio</Link></li>
              <li><Link href="/catalogo" className="text-muted-foreground hover:text-primary transition-colors text-sm">Catálogo de Productos</Link></li>
              <li><Link href="/distribuidor" className="text-muted-foreground hover:text-primary transition-colors text-sm">Portal de Distribuidores B2B</Link></li>
              <li><Link href="/regiones" className="text-muted-foreground hover:text-primary transition-colors text-sm">Cobertura Regional</Link></li>
              <li><Link href="/nosotros" className="text-muted-foreground hover:text-primary transition-colors text-sm">Nosotros &amp; Certificaciones</Link></li>
            </ul>

            <h4 className="font-display font-bold text-white mt-8 mb-5 uppercase tracking-wider text-sm">Productos</h4>
            <ul className="space-y-3">
              <li><Link href="/catalogo" className="text-muted-foreground hover:text-primary transition-colors text-sm">Convertidores Catalíticos</Link></li>
              <li><Link href="/catalogo" className="text-muted-foreground hover:text-primary transition-colors text-sm">Sistemas de Escape</Link></li>
              <li><Link href="/catalogo" className="text-muted-foreground hover:text-primary transition-colors text-sm">Silenciadores</Link></li>
              <li><Link href="/catalogo" className="text-muted-foreground hover:text-primary transition-colors text-sm">Tubos Flexibles</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="font-display font-bold text-white mb-5 uppercase tracking-wider text-sm">Contacto Corporativo</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Teléfono Central</p>
                  <a href="tel:+525521787771" className="text-sm text-white hover:text-primary transition-colors font-medium">
                    +52 55 2178 7771
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email Ventas</p>
                  <a href="mailto:ventas@Dynamex.mx" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                    ventas@Dynamex.mx
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Oficina Matriz</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Santa Lucía Milpa Alta<br />Ciudad de México, CDMX</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Planta Norte</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Tlalnepantla de Baz<br />Estado de México, MX</p>
                </div>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Atención Mayoristas</p>
              <p className="text-xs text-muted-foreground">Lunes a Viernes 8:00 – 18:00 CST</p>
              <p className="text-xs text-muted-foreground">Sábado 9:00 – 14:00 CST</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>&copy; {new Date().getFullYear()} Dynamex. Todos los derechos reservados.</p>
            <span className="hidden md:block text-white/20">|</span>
            <p className="text-xs">Fabricación de calidad de exportación desde México.</p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white text-xs transition-colors">Aviso de Privacidad</Link>
            <Link href="#" className="hover:text-white text-xs transition-colors">Términos y Condiciones</Link>
            <Link href="#" className="hover:text-white text-xs transition-colors">Política de Calidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
