import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/snapshot-c2m0a2c3/", "/order-form/"],
    },
    sitemap: "https://www.comsewoguemusicandarts.org/sitemap.xml",
  };
}
