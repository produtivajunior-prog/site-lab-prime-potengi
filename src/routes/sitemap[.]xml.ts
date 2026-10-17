import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const entries = [
  { path: "/", priority: "1.0", changefreq: "weekly" as const },
  { path: "/quem-somos", priority: "0.8", changefreq: "monthly" as const },
  { path: "/servicos", priority: "0.9", changefreq: "weekly" as const },
  { path: "/parceiros", priority: "0.6", changefreq: "monthly" as const },
  { path: "/unidades", priority: "0.8", changefreq: "monthly" as const },
  { path: "/atendimento-movel", priority: "0.7", changefreq: "monthly" as const },
  { path: "/contato", priority: "0.7", changefreq: "monthly" as const },
  
  { path: "/auth", priority: "0.5", changefreq: "yearly" as const },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
