import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://agentcouch.com",        lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: "https://agentcouch.com/terms",  lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://agentcouch.com/success",lastModified: new Date(), changeFrequency: "never",   priority: 0.1 },
  ];
}
