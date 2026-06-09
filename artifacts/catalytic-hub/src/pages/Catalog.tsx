// [Zenith Safe-Code Protocol Active]
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Factory,
  ChevronDown,
  ChevronUp,
  X,
  ShoppingCart,
  Plus,
  Minus,
  MessageCircle,
  Send,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useListProducts,
  getListProductsQueryKey,
} from "@workspace/api-client-react";

const CATEGORIES = [
  { value: "", label: "Todos" },
  { value: "convertidor_catalitico", label: "Convertidores Catalíticos" },
  { value: "escape", label: "Tubos de Escape" },
  { value: "silenciador", label: "Silenciadores" },
  { value: "tubo_flexible", label: "Tubos Flexibles" },
];

const BRANDS = [
  "Toyota", "Honda", "Chevrolet", "Nissan", "Hyundai",
  "Kia", "Ford", "Volkswagen", "Mazda", "Dodge", "Isuzu", "Hino",
];

const WHATSAPP_NUMBER = "525521787771";

const CERT_COLORS: Record<string, string> = {
  "EPA": "bg-green-900/60 text-green-300 border-green-700/50",
  "CARB": "bg-blue-900/60 text-blue-300 border-blue-700/50",
  "Euro 5": "bg-purple-900/60 text-purple-300 border-purple-700/50",
  "Euro 6": "bg-indigo-900/60 text-indigo-300 border-indigo-700/50",
  "ISO 9001": "bg-amber-900/60 text-amber-300 border-amber-700/50",
};

function SpecTable({ specs }: { specs: Record<string, string> | null }) {
  if (!specs || Object.keys(specs).length === 0) return null;
  return (
    <div className="overflow-hidden rounded-md border border-white/10">
      <table className="w-full text-sm">
        <tbody>
          {Object.entries(specs).map(([key, val], i) => (
            <tr key={key} className={i % 2 === 0 ? "bg-black/20" : "bg-transparent"}>
              <td className="py-2 px-3 text-muted-foreground font-medium whitespace-nowrap">{key}</td>
              <td className="py-2 px-3 text-foreground font-mono text-right">{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function normalizeArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

type ProductItem = {
  id: number;
  name: string;
  sku: string;
  category: string;
  description: string;
  technicalSpecs?: Record<string, string> | null | unknown;
  compatibleBrands?: string[] | unknown;
  certifications?: string[] | unknown;
  imageUrl?: string | null;
  isFeatured: boolean;
};

type QuoteItem = {
  product: ProductItem;
  quantity: number;
};

function buildQuoteUrl(items: QuoteItem[]) {
  const lines = items.map(
    ({ product, quantity }) => `- ${quantity}x ${product.name} (${product.sku})`
  );
  const message = [
    "Hola Dynamex, quiero cotizar estas piezas:",
    "",
    ...lines,
    "",
    "Me pueden confirmar precio mayorista, disponibilidad y compatibilidad?",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function ProductCard({
  product,
  index,
  quoteQuantity,
  onAdd,
  onRemove,
}: {
  product: ProductItem;
  index: number;
  quoteQuantity: number;
  onAdd: (product: ProductItem) => void;
  onRemove: (productId: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const categoryLabel = CATEGORIES.find(c => c.value === product.category)?.label ?? product.category;
  const compatibleBrands = normalizeArray(product.compatibleBrands);
  const certifications = normalizeArray(product.certifications);
  const singleQuoteUrl = buildQuoteUrl([{ product, quantity: Math.max(quoteQuantity, 1) }]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.08 }}
    >
      <Card className="bg-card/60 border-white/5 hover:border-primary/40 transition-all duration-300 overflow-hidden group h-full">
        {/* Product image / placeholder */}
        <div className="aspect-video bg-gradient-to-br from-black to-card relative overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Factory className="w-16 h-16 text-white/10" />
            </div>
          )}
          {product.isFeatured && (
            <span className="absolute top-3 right-3 bg-primary text-black text-xs font-bold px-2 py-0.5 uppercase rounded-sm tracking-wider">
              Destacado
            </span>
          )}
          <span className="absolute top-3 left-3 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-sm">
            {categoryLabel}
          </span>
        </div>

        <CardContent className="p-6 space-y-4">
          <div>
            <p className="text-xs font-mono text-primary/80 mb-1 tracking-wider">{product.sku}</p>
            <h3 className="text-lg font-display font-bold leading-tight">{product.name}</h3>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{product.description}</p>

          {/* Compatible brands */}
          {compatibleBrands.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Compatible con</p>
              <div className="flex flex-wrap gap-1">
                {compatibleBrands.slice(0, 5).map((b) => (
                  <span key={b} className="text-xs px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-muted-foreground">
                    {b}
                  </span>
                ))}
                {compatibleBrands.length > 5 && (
                  <span className="text-xs px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-muted-foreground">
                    +{compatibleBrands.length - 5} más
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className={`text-xs px-2 py-0.5 rounded-sm border font-bold ${CERT_COLORS[cert] ?? "bg-white/5 border-white/20 text-muted-foreground"}`}
                >
                  {cert}
                </span>
              ))}
            </div>
          )}

          {/* Quote actions */}
          <div className="grid grid-cols-[1fr,auto] gap-2 pt-2">
            <Button onClick={() => onAdd(product)} className="font-bold">
              <ShoppingCart className="w-4 h-4 mr-2" />
              {quoteQuantity > 0 ? `En cotización (${quoteQuantity})` : "Agregar a cotización"}
            </Button>
            {quoteQuantity > 0 && (
              <div className="flex items-center rounded-md border border-white/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => onRemove(product.id)}
                  className="h-10 w-9 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={`Quitar ${product.name} de la cotización`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="h-10 min-w-8 px-2 flex items-center justify-center text-sm font-bold text-white border-x border-white/10">
                  {quoteQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => onAdd(product)}
                  className="h-10 w-9 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={`Agregar otra unidad de ${product.name}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <Button variant="outline" asChild className="w-full border-green-700/40 text-green-400 hover:bg-green-700/20 hover:text-green-300">
            <a href={singleQuoteUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Cotizar esta pieza por WhatsApp
            </a>
          </Button>

          {/* Expandable specs */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-sm font-medium text-primary hover:text-primary/80 transition-colors pt-2 border-t border-white/10"
          >
            <span>{expanded ? "Ocultar especificaciones" : "Ver especificaciones técnicas"}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <div
            style={{
              maxHeight: expanded ? "600px" : "0",
              overflow: "hidden",
              opacity: expanded ? 1 : 0,
              transition: "max-height 0.3s ease, opacity 0.2s ease",
            }}
          >
            <SpecTable specs={product.technicalSpecs as Record<string, string> | null} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Catalog() {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [quoteItems, setQuoteItems] = useState<Record<number, QuoteItem>>({});

  const params = {
    ...(category ? { category } : {}),
    ...(brand ? { brand } : {}),
  };

  const { data: products = [], isLoading } = useListProducts(params, {
    query: { queryKey: getListProductsQueryKey(params) },
  });

  const filtered = search.trim()
    ? products.filter((p) => {
        const searchable = [
          p.name,
          p.sku,
          p.description,
          ...normalizeArray(p.compatibleBrands),
          ...Object.values((p.technicalSpecs as Record<string, string> | null) ?? {}),
        ]
          .join(" ")
          .toLowerCase();

        return searchable.includes(search.toLowerCase());
      })
    : products;

  const quoteList = Object.values(quoteItems);
  const quoteCount = quoteList.reduce((total, item) => total + item.quantity, 0);
  const quoteUrl = buildQuoteUrl(quoteList);

  const addToQuote = (product: ProductItem) => {
    setQuoteItems((current) => ({
      ...current,
      [product.id]: {
        product,
        quantity: (current[product.id]?.quantity ?? 0) + 1,
      },
    }));
  };

  const removeFromQuote = (productId: number) => {
    setQuoteItems((current) => {
      const existing = current[productId];
      if (!existing) return current;

      if (existing.quantity <= 1) {
        const next = { ...current };
        delete next[productId];
        return next;
      }

      return {
        ...current,
        [productId]: {
          ...existing,
          quantity: existing.quantity - 1,
        },
      };
    });
  };

  return (
    <PageLayout>
      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-black to-background border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Catálogo de Productos</p>
            <h1 className="text-5xl md:text-6xl font-display font-bold uppercase mb-6">
              Ingeniería de<br />
              <span className="text-primary">Alta Precisión</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Especificaciones técnicas completas, compatibilidades y certificaciones ambientales para cada producto de nuestra línea de fabricación.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              {[
                ["18+", "SKUs activos"],
                ["4", "familias de producto"],
                ["WhatsApp", "cotización directa"],
                ["B2B", "precio por volumen"],
              ].map(([value, label]) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                  <p className="font-display font-bold text-primary text-2xl">{value}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-card/30 border-b border-white/10 sticky top-20 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre o SKU..."
                className="w-full pl-9 pr-4 py-2.5 bg-background border border-white/10 rounded-md text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                    category === cat.value
                      ? "bg-primary text-black"
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
            >
              <Filter className="w-4 h-4" />
              Marca
              {brand && <span className="w-2 h-2 bg-primary rounded-full" />}
            </button>
          </div>

          {/* Brand filter */}
          <div
            style={{
              maxHeight: showFilters ? "400px" : "0",
              overflow: "hidden",
              opacity: showFilters ? 1 : 0,
              transition: "max-height 0.3s ease, opacity 0.2s ease",
            }}
          >
            {true && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Filtrar por marca</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setBrand("")}
                    className={`px-3 py-1 rounded-sm text-xs font-medium transition-all border ${
                      brand === "" ? "bg-primary text-black border-primary" : "border-white/20 text-muted-foreground hover:border-white/40"
                    }`}
                  >
                    Todas
                  </button>
                  {BRANDS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrand(b === brand ? "" : b)}
                      className={`px-3 py-1 rounded-sm text-xs font-medium transition-all border ${
                        brand === b ? "bg-primary text-black border-primary" : "border-white/20 text-muted-foreground hover:border-white/40"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 bg-background flex-grow">
        <div className="container mx-auto px-4 md:px-8">
          {/* Active filters summary */}
          {(category || brand || search) && (
            <div className="flex items-center gap-3 mb-8 text-sm text-muted-foreground">
              <span>{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</span>
              {category && (
                <button onClick={() => setCategory("")} className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm hover:border-white/30">
                  {CATEGORIES.find(c => c.value === category)?.label}
                  <X className="w-3 h-3" />
                </button>
              )}
              {brand && (
                <button onClick={() => setBrand("")} className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm hover:border-white/30">
                  {brand} <X className="w-3 h-3" />
                </button>
              )}
              {search && (
                <button onClick={() => setSearch("")} className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm hover:border-white/30">
                  "{search}" <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-white/5 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Factory className="w-16 h-16 text-white/10 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold mb-2">Sin resultados</h3>
              <p className="text-muted-foreground">Ajusta los filtros para ver más productos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  quoteQuantity={quoteItems[product.id]?.quantity ?? 0}
                  onAdd={addToQuote}
                  onRemove={removeFromQuote}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {quoteCount > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/30 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display font-bold text-white">
                  {quoteCount} pieza{quoteCount !== 1 ? "s" : ""} en cotización
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {quoteList.map((item) => `${item.quantity}x ${item.product.sku}`).join(" · ")}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setQuoteItems({})} className="border-white/20">
                Limpiar
              </Button>
              <Button asChild className="font-bold">
                <a href={quoteUrl} target="_blank" rel="noopener noreferrer">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar cotización
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
