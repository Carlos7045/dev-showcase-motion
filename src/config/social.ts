/**
 * Social Configuration - Configurações de redes sociais
 * Links, dados e configurações para todas as redes sociais
 */

import { SOCIAL_LINKS, CONTACT_INFO } from './app';

// === PLATAFORMAS SOCIAIS ===
export const SOCIAL_PLATFORMS = {
  github: {
    name: 'GitHub',
    icon: 'Github',
    url: SOCIAL_LINKS.github.url,
    username: SOCIAL_LINKS.github.username,
    label: SOCIAL_LINKS.github.label,
    color: '#333333',
    hoverColor: '#24292e',
    bgColor: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    textColor: 'text-gray-700 dark:text-gray-300',
    description: 'Confira meus projetos e contribuições open source',
    followers: '500+',
    repositories: '50+',
    contributions: '1000+',
    isPublic: true,
    showInHeader: true,
    showInFooter: true,
    showInContact: true,
    priority: 1,
  },
  linkedin: {
    name: 'LinkedIn',
    icon: 'Linkedin',
    url: SOCIAL_LINKS.linkedin.url,
    username: SOCIAL_LINKS.linkedin.username,
    label: SOCIAL_LINKS.linkedin.label,
    color: '#0077b5',
    hoverColor: '#005885',
    bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    description: 'Conecte-se comigo profissionalmente',
    connections: '500+',
    experience: '5+ anos',
    recommendations: '15+',
    isPublic: true,
    showInHeader: true,
    showInFooter: true,
    showInContact: true,
    priority: 2,
  },
  instagram: {
    name: 'Instagram',
    icon: 'Instagram',
    url: SOCIAL_LINKS.instagram.url,
    username: SOCIAL_LINKS.instagram.username,
    label: SOCIAL_LINKS.instagram.label,
    color: '#E4405F',
    hoverColor: '#C13584',
    bgColor: 'hover:bg-pink-50 dark:hover:bg-pink-900/20',
    textColor: 'text-pink-600 dark:text-pink-400',
    description: 'Acompanhe meu dia a dia e bastidores',
    followers: '1000+',
    posts: '200+',
    stories: 'Ativo',
    isPublic: true,
    showInHeader: false,
    showInFooter: true,
    showInContact: false,
    priority: 4,
  },
  twitter: {
    name: 'Twitter',
    icon: 'Twitter',
    url: SOCIAL_LINKS.twitter.url,
    username: SOCIAL_LINKS.twitter.username,
    label: SOCIAL_LINKS.twitter.label,
    color: '#1da1f2',
    hoverColor: '#0d8bd9',
    bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
    textColor: 'text-blue-500 dark:text-blue-400',
    description: 'Acompanhe dicas e novidades sobre desenvolvimento',
    followers: '300+',
    tweets: '500+',
    engagement: 'Alto',
    isPublic: true,
    showInHeader: false,
    showInFooter: true,
    showInContact: false,
    priority: 5,
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: 'MessageCircle',
    url: `https://wa.me/${CONTACT_INFO.whatsapp.number}`,
    username: CONTACT_INFO.whatsapp.number,
    label: 'WhatsApp',
    color: '#25D366',
    hoverColor: '#128C7E',
    bgColor: 'hover:bg-green-50 dark:hover:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
    description: 'Conversa rápida e direta',
    responseTime: '< 2 horas',
    availability: '9h às 18h',
    timezone: 'GMT-3',
    isPublic: true,
    showInHeader: false,
    showInFooter: false,
    showInContact: true,
    priority: 1,
  },
  email: {
    name: 'E-mail',
    icon: 'Mail',
    url: `mailto:${CONTACT_INFO.email}`,
    username: CONTACT_INFO.email,
    label: 'E-mail',
    color: '#EA4335',
    hoverColor: '#D33B2C',
    bgColor: 'hover:bg-red-50 dark:hover:bg-red-900/20',
    textColor: 'text-red-600 dark:text-red-400',
    description: 'Para propostas formais e detalhadas',
    responseTime: '< 24 horas',
    availability: 'Sempre disponível',
    encryption: 'Suportado',
    isPublic: true,
    showInHeader: false,
    showInFooter: false,
    showInContact: true,
    priority: 2,
  },
  youtube: {
    name: 'YouTube',
    icon: 'Youtube',
    url: 'https://youtube.com/@carlos-salgado-dev',
    username: 'carlos-salgado-dev',
    label: 'YouTube',
    color: '#FF0000',
    hoverColor: '#CC0000',
    bgColor: 'hover:bg-red-50 dark:hover:bg-red-900/20',
    textColor: 'text-red-600 dark:text-red-400',
    description: 'Tutoriais e conteúdo sobre desenvolvimento',
    subscribers: '100+',
    videos: '20+',
    views: '10k+',
    isPublic: false, // Ainda não ativo
    showInHeader: false,
    showInFooter: false,
    showInContact: false,
    priority: 6,
  },
  discord: {
    name: 'Discord',
    icon: 'MessageSquare',
    url: 'https://discord.gg/carlos-dev',
    username: 'carlos#1234',
    label: 'Discord',
    color: '#5865F2',
    hoverColor: '#4752C4',
    bgColor: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    description: 'Comunidade de desenvolvedores',
    members: '50+',
    channels: '5',
    activity: 'Ativo',
    isPublic: false, // Ainda não ativo
    showInHeader: false,
    showInFooter: false,
    showInContact: false,
    priority: 7,
  },
} as const;

// === CONFIGURAÇÕES DE COMPARTILHAMENTO ===
export const SHARING_CONFIG = {
  enableSharing: true,
  platforms: ['twitter', 'linkedin', 'whatsapp', 'email'] as const,
  defaultMessage: 'Confira o portfolio de Carlos Henrique Salgado - Desenvolvedor Full Stack',
  hashtags: ['webdev', 'fullstack', 'react', 'nodejs', 'typescript'],
  via: SOCIAL_LINKS.twitter.username,
} as const;

// === MENSAGENS PERSONALIZADAS ===
export const SOCIAL_MESSAGES = {
  whatsapp: {
    default: CONTACT_INFO.whatsapp.message,
    project: 'Olá! Gostaria de conversar sobre um projeto de desenvolvimento web.',
    consultation: 'Olá! Preciso de uma consultoria técnica. Podemos conversar?',
    collaboration: 'Olá! Tenho uma proposta de colaboração. Vamos conversar?',
    support: 'Olá! Preciso de suporte técnico. Você pode me ajudar?',
    quote: 'Olá! Gostaria de solicitar um orçamento para meu projeto.',
  },
  email: {
    default: {
      subject: 'Projeto de Desenvolvimento',
      body: CONTACT_INFO.whatsapp.message,
    },
    project: {
      subject: 'Novo Projeto - Desenvolvimento Web',
      body: 'Olá Carlos,\n\nGostaria de conversar sobre um projeto de desenvolvimento web.\n\nDetalhes do projeto:\n- \n- \n- \n\nAguardo seu retorno.\n\nAtenciosamente,',
    },
    consultation: {
      subject: 'Consultoria Técnica',
      body: 'Olá Carlos,\n\nPreciso de uma consultoria técnica sobre:\n- \n- \n\nPodemos agendar uma conversa?\n\nAtenciosamente,',
    },
    collaboration: {
      subject: 'Proposta de Colaboração',
      body: 'Olá Carlos,\n\nTenho uma proposta de colaboração que pode ser interessante.\n\nDetalhes:\n- \n- \n\nVamos conversar?\n\nAtenciosamente,',
    },
  },
  linkedin: {
    default: 'Olá! Vi seu portfolio e gostaria de me conectar.',
    project: 'Olá Carlos! Tenho um projeto interessante e gostaria de conversar com você.',
    networking: 'Olá! Sou da área de tecnologia e gostaria de expandir minha rede.',
    recommendation: 'Olá Carlos! Gostaria de recomendar seu trabalho.',
  },
} as const;

// === CONFIGURAÇÕES DE ANALYTICS SOCIAL ===
export const SOCIAL_ANALYTICS = {
  trackClicks: true,
  trackShares: true,
  trackFollows: false, // Não é possível rastrear diretamente
  utmSource: 'portfolio',
  utmMedium: 'social',
  utmCampaign: 'portfolio-2024',
  customParameters: {
    github: { utm_content: 'github-profile' },
    linkedin: { utm_content: 'linkedin-profile' },
    instagram: { utm_content: 'instagram-profile' },
    twitter: { utm_content: 'twitter-profile' },
    whatsapp: { utm_content: 'whatsapp-contact' },
    email: { utm_content: 'email-contact' },
  },
} as const;

// === HELPERS ===
export const getSocialPlatforms = (filter?: {
  showInHeader?: boolean;
  showInFooter?: boolean;
  showInContact?: boolean;
  isPublic?: boolean;
}) => {
  return Object.entries(SOCIAL_PLATFORMS)
    .filter(([_, platform]) => {
      if (filter?.showInHeader !== undefined && platform.showInHeader !== filter.showInHeader) return false;
      if (filter?.showInFooter !== undefined && platform.showInFooter !== filter.showInFooter) return false;
      if (filter?.showInContact !== undefined && platform.showInContact !== filter.showInContact) return false;
      if (filter?.isPublic !== undefined && platform.isPublic !== filter.isPublic) return false;
      return true;
    })
    .sort(([_, a], [__, b]) => a.priority - b.priority)
    .map(([key, platform]) => ({ key, ...platform }));
};

export const getSocialPlatform = (key: keyof typeof SOCIAL_PLATFORMS) => {
  return SOCIAL_PLATFORMS[key];
};

export const getWhatsAppUrl = (messageType: keyof typeof SOCIAL_MESSAGES.whatsapp = 'default') => {
  const message = SOCIAL_MESSAGES.whatsapp[messageType];
  return `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(message)}`;
};

export const getEmailUrl = (messageType: keyof typeof SOCIAL_MESSAGES.email = 'default') => {
  const { subject, body } = SOCIAL_MESSAGES.email[messageType];
  const params = new URLSearchParams({ subject, body });
  return `mailto:${CONTACT_INFO.email}?${params.toString()}`;
};

export const getLinkedInUrl = (messageType: keyof typeof SOCIAL_MESSAGES.linkedin = 'default') => {
  const message = SOCIAL_MESSAGES.linkedin[messageType];
  return `${SOCIAL_LINKS.linkedin.url}?message=${encodeURIComponent(message)}`;
};

export const getShareUrl = (platform: typeof SHARING_CONFIG.platforms[number], url: string, text?: string) => {
  const shareText = text || SHARING_CONFIG.defaultMessage;
  const hashtags = SHARING_CONFIG.hashtags.join(',');

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}&via=${SHARING_CONFIG.via}`;

    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(shareText)}`;

    case 'whatsapp':
      return `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`;

    case 'email':
      const subject = 'Confira este portfolio';
      const body = `${shareText}\n\n${url}`;
      return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    default:
      return url;
  }
};

export const addAnalyticsToUrl = (url: string, platform: keyof typeof SOCIAL_PLATFORMS) => {
  const urlObj = new URL(url);
  const analytics = SOCIAL_ANALYTICS;
  const customParams = analytics.customParameters[platform] || {};

  if (analytics.trackClicks) {
    urlObj.searchParams.set('utm_source', analytics.utmSource);
    urlObj.searchParams.set('utm_medium', analytics.utmMedium);
    urlObj.searchParams.set('utm_campaign', analytics.utmCampaign);

    Object.entries(customParams).forEach(([key, value]) => {
      urlObj.searchParams.set(key, String(value));
    });
  }

  return urlObj.toString();
};

export const getSocialMetrics = () => {
  return Object.entries(SOCIAL_PLATFORMS)
    .filter(([_, platform]) => platform.isPublic)
    .map(([key, platform]) => {
      // Mapear propriedades específicas de cada plataforma
      let followers = '0';
      let engagement = 'N/A';

      if ('followers' in platform) {
        followers = String(platform.followers);
      } else if ('connections' in platform) {
        followers = String(platform.connections);
      } else if ('subscribers' in platform) {
        followers = String(platform.subscribers);
      } else if ('members' in platform) {
        followers = String(platform.members);
      }

      if ('engagement' in platform) {
        engagement = String(platform.engagement);
      } else if ('tweets' in platform) {
        engagement = String(platform.tweets);
      } else if ('posts' in platform) {
        engagement = String(platform.posts);
      } else if ('videos' in platform) {
        engagement = String(platform.videos);
      }

      return {
        platform: key,
        name: platform.name,
        followers,
        engagement,
        priority: platform.priority,
      };
    })
    .sort((a, b) => a.priority - b.priority);
};

// === TIPOS ===
export type SocialPlatform = typeof SOCIAL_PLATFORMS[keyof typeof SOCIAL_PLATFORMS];
export type SocialPlatformKey = keyof typeof SOCIAL_PLATFORMS;
export type SharingPlatform = typeof SHARING_CONFIG.platforms[number];
export type MessageType = keyof typeof SOCIAL_MESSAGES.whatsapp;
export type EmailMessageType = keyof typeof SOCIAL_MESSAGES.email;
export type LinkedInMessageType = keyof typeof SOCIAL_MESSAGES.linkedin;