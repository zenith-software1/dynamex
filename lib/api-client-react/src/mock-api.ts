import type { CustomFetchOptions } from "./custom-fetch";

type Json = Record<string, unknown> | unknown[] | null;

const regions = [
  {
    id: 1,
    code: "CR",
    name: "Costa Rica",
    currency: "CRC",
    phone: "+506 8800 2090",
    email: "cr@dynamex.mx",
    address: "Zona Franca Coyol, Alajuela, Costa Rica",
    whatsapp: "50688002090",
    distributionTime: "24–48 hrs",
    isActive: true,
  },
  {
    id: 2,
    code: "CO",
    name: "Colombia",
    currency: "COP",
    phone: "+57 310 555 0192",
    email: "colombia@dynamex.mx",
    address: "Bogotá D.C., Colombia",
    whatsapp: "573105550192",
    distributionTime: "3–5 días hábiles",
    isActive: true,
  },
  {
    id: 3,
    code: "EC",
    name: "Ecuador",
    currency: "USD",
    phone: "+593 99 555 0174",
    email: "ecuador@dynamex.mx",
    address: "Quito, Pichincha, Ecuador",
    whatsapp: "593995550174",
    distributionTime: "3–5 días hábiles",
    isActive: true,
  },
];

const products = [
  {
    id: 1,
    name: "Convertidor Universal Euro 4",
    sku: "DMX-CAT-E4-001",
    category: "convertidor_catalitico",
    description:
      "Convertidor catalítico de cerámica de alto flujo para motor 4 cilindros. Certificación Euro 4.",
    technicalSpecs: { material: "Cerámica 400 cpsi", entrada: "2 pulgadas", emisiones: "Euro 4" },
    compatibleBrands: ["Nissan", "Toyota", "Honda", "Mazda"],
    certifications: ["Euro 4", "EPA Tier 2"],
    imageUrl: "/images/products/catalytic-converter.svg",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Convertidor Pickup Diesel DPF",
    sku: "DMX-DPF-002",
    category: "convertidor_catalitico",
    description: "Filtro de partículas diesel para pickups 2.5L-3.0L.",
    technicalSpecs: { aplicacion: "Diesel 2.5L-3.0L", entrada: "2.5 pulgadas", emisiones: "Euro 5" },
    compatibleBrands: ["Ford", "Chevrolet", "RAM", "Mitsubishi"],
    certifications: ["Euro 5"],
    imageUrl: "/images/products/dpf-filter.svg",
    isFeatured: true,
  },
  {
    id: 3,
    name: "Línea de Escape Completa Inox",
    sku: "DMX-ESC-003",
    category: "escape",
    description: "Línea de escape completa en acero inoxidable 304.",
    technicalSpecs: { material: "Acero inoxidable 304", diametro: "2.5 pulgadas" },
    compatibleBrands: ["Volkswagen", "Seat", "Audi"],
    certifications: ["ISO 9001"],
    imageUrl: "/images/products/exhaust-system.svg",
    isFeatured: true,
  },
  {
    id: 4,
    name: "Convertidor Compacto 3 Cilindros",
    sku: "DMX-CAT-C3-004",
    category: "convertidor_catalitico",
    description: "Diseño compacto para vehículos urbanos 3 cilindros y motores híbridos ligeros.",
    technicalSpecs: { material: "Sustrato metálico", entrada: "1.75 pulgadas", emisiones: "Euro 5" },
    compatibleBrands: ["Suzuki", "Hyundai", "Kia", "Chevrolet"],
    certifications: ["Euro 5"],
    imageUrl: "/images/products/catalytic-converter.svg",
    isFeatured: false,
  },
  {
    id: 5,
    name: "Silenciador Deportivo Oval",
    sku: "DMX-SIL-005",
    category: "silenciador",
    description: "Silenciador de alto flujo con acabado cromado.",
    technicalSpecs: { material: "Acero aluminizado", entrada: "2.5 pulgadas", salida: "3 pulgadas" },
    compatibleBrands: ["Universal", "Volkswagen", "Mazda", "Honda"],
    certifications: ["ISO 9001"],
    imageUrl: "/images/products/muffler.svg",
    isFeatured: false,
  },
  {
    id: 6,
    name: "Convertidor Euro 6 Premium",
    sku: "DMX-CAT-E6-006",
    category: "convertidor_catalitico",
    description: "Máxima eficiencia para flotas comerciales.",
    technicalSpecs: { material: "Cerámica 600 cpsi", entrada: "2.25 pulgadas", emisiones: "Euro 6" },
    compatibleBrands: ["Mercedes-Benz", "BMW", "Volvo", "Hino"],
    certifications: ["Euro 6", "CARB"],
    imageUrl: "/images/products/catalytic-converter.svg",
    isFeatured: false,
  },
  {
    id: 7,
    name: "Convertidor Universal 2.25 Pulgadas",
    sku: "DMX-CAT-U225-007",
    category: "convertidor_catalitico",
    description: "Convertidor universal para autos compactos y sedanes.",
    technicalSpecs: { entrada: "2.25 pulgadas", aplicacion: "Gasolina 1.8L-2.8L" },
    compatibleBrands: ["Toyota", "Nissan", "Honda", "Hyundai", "Kia"],
    certifications: ["EPA"],
    imageUrl: "/images/products/catalytic-converter.svg",
    isFeatured: false,
  },
  {
    id: 8,
    name: "Convertidor Universal 2.5 Pulgadas",
    sku: "DMX-CAT-U250-008",
    category: "convertidor_catalitico",
    description: "Convertidor universal para pickups ligeras y motores de mayor cilindrada.",
    technicalSpecs: { entrada: "2.5 pulgadas", aplicacion: "Gasolina 2.4L-3.5L" },
    compatibleBrands: ["Ford", "Chevrolet", "Dodge", "Toyota", "Nissan"],
    certifications: ["EPA", "Euro 5"],
    imageUrl: "/images/products/catalytic-converter.svg",
    isFeatured: false,
  },
  {
    id: 9,
    name: "Convertidor Alto Flujo 3 Pulgadas",
    sku: "DMX-CAT-HF300-009",
    category: "convertidor_catalitico",
    description: "Convertidor de alto flujo para proyectos performance y camionetas.",
    technicalSpecs: { entrada: "3 pulgadas", aplicacion: "Performance / pickup" },
    compatibleBrands: ["Ford", "Chevrolet", "Dodge", "Jeep", "Universal"],
    certifications: ["EPA"],
    imageUrl: "/images/products/catalytic-converter.svg",
    isFeatured: false,
  },
  {
    id: 10,
    name: "Mofle Cámara Estándar",
    sku: "DMX-SIL-CAM-010",
    category: "silenciador",
    description: "Mofle de cámara para reemplazo directo en talleres.",
    technicalSpecs: { cuerpo: "Rectangular 18 pulgadas", entrada: "2 pulgadas" },
    compatibleBrands: ["Nissan", "Toyota", "Chevrolet", "Volkswagen"],
    certifications: ["ISO 9001"],
    imageUrl: "/images/products/muffler.svg",
    isFeatured: false,
  },
  {
    id: 11,
    name: "Mofle Redondo Alto Flujo",
    sku: "DMX-SIL-RND-011",
    category: "silenciador",
    description: "Silenciador redondo con empaque acústico de fibra cerámica.",
    technicalSpecs: { cuerpo: "Redondo 16 pulgadas", entrada: "2.5 pulgadas" },
    compatibleBrands: ["Universal", "Honda", "Mazda", "Volkswagen", "Seat"],
    certifications: ["ISO 9001"],
    imageUrl: "/images/products/muffler.svg",
    isFeatured: false,
  },
  {
    id: 12,
    name: "Resonador Compacto Universal",
    sku: "DMX-SIL-RES-012",
    category: "silenciador",
    description: "Resonador compacto para reducir vibración y ruido medio.",
    technicalSpecs: { cuerpo: "12 pulgadas", entrada: "2.25 pulgadas" },
    compatibleBrands: ["Universal", "Toyota", "Hyundai", "Kia", "Nissan"],
    certifications: ["ISO 9001"],
    imageUrl: "/images/products/muffler.svg",
    isFeatured: false,
  },
  {
    id: 13,
    name: "Tubo Flexible Mallado 8 Pulgadas",
    sku: "DMX-FLX-008-013",
    category: "tubo_flexible",
    description: "Flexible mallado para reparar fugas, vibración y fatiga.",
    technicalSpecs: { longitud: "8 pulgadas", entrada: "2 pulgadas" },
    compatibleBrands: ["Universal", "Nissan", "Chevrolet", "Hyundai"],
    certifications: ["ISO 9001"],
    imageUrl: "/images/products/flexible-pipe.svg",
    isFeatured: false,
  },
  {
    id: 14,
    name: "Tubo Flexible Mallado 10 Pulgadas",
    sku: "DMX-FLX-010-014",
    category: "tubo_flexible",
    description: "Flexible reforzado para sedanes y SUV ligeras.",
    technicalSpecs: { longitud: "10 pulgadas", entrada: "2.25 pulgadas" },
    compatibleBrands: ["Universal", "Toyota", "Honda", "Mazda", "Kia"],
    certifications: ["ISO 9001"],
    imageUrl: "/images/products/flexible-pipe.svg",
    isFeatured: false,
  },
  {
    id: 15,
    name: "Tubo Flexible Mallado 12 Pulgadas",
    sku: "DMX-FLX-012-015",
    category: "tubo_flexible",
    description: "Flexible de mayor longitud para camionetas y líneas con más movimiento.",
    technicalSpecs: { longitud: "12 pulgadas", entrada: "2.5 pulgadas" },
    compatibleBrands: ["Universal", "Ford", "Chevrolet", "Dodge", "Jeep"],
    certifications: ["ISO 9001"],
    imageUrl: "/images/products/flexible-pipe.svg",
    isFeatured: false,
  },
  {
    id: 16,
    name: "Tubo Recto Inox 2 Pulgadas",
    sku: "DMX-ESC-200-016",
    category: "escape",
    description: "Tramo recto en acero inoxidable para fabricación y reparación.",
    technicalSpecs: { diametro: "2 pulgadas", longitud: "1 metro" },
    compatibleBrands: ["Universal", "Nissan", "Toyota", "Chevrolet"],
    certifications: ["ISO 9001"],
    imageUrl: "/images/products/exhaust-system.svg",
    isFeatured: false,
  },
  {
    id: 17,
    name: "Tubo Recto Inox 2.5 Pulgadas",
    sku: "DMX-ESC-250-017",
    category: "escape",
    description: "Tubo recto para sistemas deportivos y camionetas ligeras.",
    technicalSpecs: { diametro: "2.5 pulgadas", longitud: "1 metro" },
    compatibleBrands: ["Universal", "Ford", "Volkswagen", "Mazda", "Dodge"],
    certifications: ["ISO 9001"],
    imageUrl: "/images/products/exhaust-system.svg",
    isFeatured: false,
  },
  {
    id: 18,
    name: "Codo Mandril 90 Grados",
    sku: "DMX-ESC-C90-018",
    category: "escape",
    description: "Codo mandril para fabricación de líneas custom sin restringir flujo.",
    technicalSpecs: { diametro: "2.5 pulgadas", angulo: "90 grados" },
    compatibleBrands: ["Universal", "Honda", "Volkswagen", "BMW", "Mercedes-Benz"],
    certifications: ["ISO 9001"],
    imageUrl: "/images/products/exhaust-system.svg",
    isFeatured: false,
  },
];

let distributors = [
  {
    id: 1,
    companyName: "AutoPartes del Valle S.A.",
    contactName: "Carlos Méndez",
    email: "carlos@autopartesvalle.cr",
    phone: "+506 8888 1234",
    country: "Costa Rica",
    city: "San José",
    businessType: "mayorista",
    estimatedMonthlyVolume: "500_1000",
    taxId: "3-101-123456",
    message: null,
    status: "approved",
    createdAt: new Date().toISOString(),
  },
];

let nextDistributorId = 2;

function parsePath(url: string): { pathname: string; search: URLSearchParams } {
  const u = new URL(url, "http://local");
  return { pathname: u.pathname, search: u.searchParams };
}

function jsonResponse<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function mockFetch(
  input: RequestInfo | URL,
  options: CustomFetchOptions = {},
): Promise<Response> {
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.toString()
        : input.url;
  const method = (options.method ?? "GET").toUpperCase();
  const { pathname, search } = parsePath(url);

  if (pathname === "/api/healthz") {
    return jsonResponse({ status: "ok" });
  }

  if (pathname === "/api/regions") {
    return jsonResponse(regions);
  }

  const regionMatch = pathname.match(/^\/api\/regions\/([^/]+)$/);
  if (regionMatch) {
    const row = regions.find((r) => r.code === regionMatch[1]);
    return row ? jsonResponse(row) : jsonResponse({ error: "Not found" }, 404);
  }

  if (pathname === "/api/catalog/featured") {
    return jsonResponse(products.filter((p) => p.isFeatured));
  }

  if (pathname === "/api/catalog") {
    let rows = [...products];
    const category = search.get("category");
    const brand = search.get("brand");
    if (category) rows = rows.filter((r) => r.category === category);
    if (brand) {
      const b = brand.toLowerCase();
      rows = rows.filter((r) =>
        r.compatibleBrands.some((x) => x.toLowerCase().includes(b)),
      );
    }
    return jsonResponse(rows);
  }

  const productMatch = pathname.match(/^\/api\/catalog\/(\d+)$/);
  if (productMatch) {
    const row = products.find((p) => p.id === Number(productMatch[1]));
    return row ? jsonResponse(row) : jsonResponse({ error: "Not found" }, 404);
  }

  if (pathname === "/api/distributors/stats") {
    return jsonResponse({
      total: distributors.length,
      pending: distributors.filter((d) => d.status === "pending").length,
      approved: distributors.filter((d) => d.status === "approved").length,
      rejected: distributors.filter((d) => d.status === "rejected").length,
      byRegion: Object.entries(
        distributors.reduce<Record<string, number>>((acc, d) => {
          acc[d.country] = (acc[d.country] ?? 0) + 1;
          return acc;
        }, {}),
      ).map(([country, count]) => ({ country, count })),
    });
  }

  if (pathname === "/api/distributors" && method === "GET") {
    return jsonResponse(distributors);
  }

  if (pathname === "/api/distributors" && method === "POST") {
    const body = options.body ? JSON.parse(String(options.body)) : {};
    const row = {
      id: nextDistributorId++,
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    distributors = [...distributors, row];
    return jsonResponse(row, 201);
  }

  const distMatch = pathname.match(/^\/api\/distributors\/(\d+)$/);
  if (distMatch) {
    const id = Number(distMatch[1]);
    const row = distributors.find((d) => d.id === id);
    if (!row) return jsonResponse({ error: "Not found" }, 404);
    if (method === "PATCH" && options.body) {
      const patch = JSON.parse(String(options.body));
      row.status = patch.status;
      return jsonResponse(row);
    }
    return jsonResponse(row);
  }

  return jsonResponse({ error: "Not found" }, 404);
}

export function isMockApiEnabled(): boolean {
  return (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_MOCK_API === "true";
}
