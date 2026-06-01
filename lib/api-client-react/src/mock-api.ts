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
      "Convertidor catalítico de cerámica de alto flujo para motor 4 cilindros.",
    technicalSpecs: { material: "Cerámica 400 cpsi", emisiones: "Euro 4" },
    compatibleBrands: ["Nissan", "Toyota", "Honda"],
    certifications: ["Euro 4"],
    imageUrl: null,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Convertidor Pickup Diesel DPF",
    sku: "DMX-DPF-002",
    category: "convertidor_catalitico",
    description: "Filtro de partículas diesel para pickups 2.5L–3.0L.",
    technicalSpecs: { emisiones: "Euro 5" },
    compatibleBrands: ["Ford", "Chevrolet", "RAM"],
    certifications: ["Euro 5"],
    imageUrl: null,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Sistema Escape Completo Inox",
    sku: "DMX-ESC-003",
    category: "sistema_escape",
    description: "Línea de escape completa en acero inoxidable 304.",
    technicalSpecs: { material: "Acero inoxidable 304" },
    compatibleBrands: ["Volkswagen", "Audi"],
    certifications: ["ISO 9001"],
    imageUrl: null,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Convertidor Compacto 3 Cilindros",
    sku: "DMX-CAT-C3-004",
    category: "convertidor_catalitico",
    description: "Diseño compacto para vehículos urbanos.",
    technicalSpecs: { emisiones: "Euro 5" },
    compatibleBrands: ["Suzuki", "Hyundai"],
    certifications: ["Euro 5"],
    imageUrl: null,
    isFeatured: false,
  },
  {
    id: 5,
    name: "Silenciador Deportivo Oval",
    sku: "DMX-SIL-005",
    category: "sistema_escape",
    description: "Silenciador de alto flujo con acabado cromado.",
    technicalSpecs: {},
    compatibleBrands: ["Universal"],
    certifications: [],
    imageUrl: null,
    isFeatured: false,
  },
  {
    id: 6,
    name: "Convertidor Euro 6 Premium",
    sku: "DMX-CAT-E6-006",
    category: "convertidor_catalitico",
    description: "Máxima eficiencia para flotas comerciales.",
    technicalSpecs: { emisiones: "Euro 6" },
    compatibleBrands: ["Mercedes-Benz", "BMW"],
    certifications: ["Euro 6"],
    imageUrl: null,
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
  return import.meta.env.VITE_MOCK_API === "true";
}
