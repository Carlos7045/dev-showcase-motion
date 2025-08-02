import { SEOData } from '@/types/seo';

export const defaultSEOConfig = {
  siteName: "Desenvolvedor Full-Stack",
  defaultTitle: "Desenvolvedor Full-Stack - Desenvolvimento Web, Automações e Integrações",
  defaultDescription: "Especialista em desenvolvimento web, automações e integrações. Criação de soluções personalizadas com React, Node.js e tecnologias modernas.",
  defaultKeywords: [
    "desenvolvedor full-stack",
    "desenvolvimento web",
    "automações",
    "integrações",
    "react",
    "nodejs",
    "typescript",
    "freelancer"
  ],
  defaultOGImage: "/og-image.jpg",
  twitterHandle: "@dev",
  locale: "pt-BR",
  siteUrl: "https://seudominio.com",
  author: "Carlos Salgado",
  telephone: "+55 99 98487-0193",
  email: "contato@seudominio.com",
  socialMedia: {
    linkedin: "https://linkedin.com/in/seu-perfil",
    github: "https://github.com/seu-usuario",
    twitter: "https://twitter.com/seu-usuario",
    instagram: "https://instagram.com/seu-usuario"
  },
  address: {
    addressLocality: "Araguaina",
    addressRegion: "TO",
    addressCountry: "BR"
  },
  businessHours: "Segunda a Sexta, 9h às 18h",
  languages: ["pt-BR", "en-US"]
};

export type SEOConfigType = typeof defaultSEOConfig;