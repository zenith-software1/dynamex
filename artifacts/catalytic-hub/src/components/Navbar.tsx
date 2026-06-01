import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/catalogo", label: "Catálogo" },
    { href: "/distribuidor", label: "Ser Distribuidor" },
    { href: "/regiones", label: "Regiones" },
    { href: "/nosotros", label: "Nosotros" },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-white/10 transition-all duration-300 ${scrolled ? "bg-background/98 backdrop-blur shadow-xl" : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"}`}>
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-primary flex items-center justify-center font-display font-bold text-lg rounded-sm text-black group-hover:scale-105 transition-transform">
            D
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-xl tracking-tight text-white">Dynamex</span>
            <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-medium hidden sm:block">Convertidores &amp; Escape</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${location === link.href ? "text-primary" : "text-muted-foreground"}`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${location === link.href ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>
          ))}
          <Button asChild className="font-bold uppercase tracking-wider text-xs">
            <Link href="/distribuidor">Portal B2B <ChevronRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </nav>

        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-b border-white/10 bg-background/98 p-4 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium p-3 rounded-md transition-colors ${location === link.href ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-white/5"}`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="font-bold uppercase tracking-wider text-xs mt-2">
            <Link href="/distribuidor">Portal B2B <ChevronRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      )}
    </header>
  );
}
