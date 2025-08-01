import { BlogPost } from '@/types/blog';

// Função para calcular tempo de leitura
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Função para formatar data
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Função para gerar slug a partir do título
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
};

// Função para extrair excerpt do conteúdo
export const extractExcerpt = (content: string, maxLength: number = 160): string => {
  const plainText = content.replace(/[#*`]/g, '').replace(/\n/g, ' ');
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength).trim() + '...'
    : plainText;
};

// Função para filtrar posts por categoria
export const filterPostsByCategory = (posts: BlogPost[], category: string): BlogPost[] => {
  return posts.filter(post => 
    post.categories.some(cat => cat.slug === category)
  );
};

// Função para filtrar posts por tag
export const filterPostsByTag = (posts: BlogPost[], tag: string): BlogPost[] => {
  return posts.filter(post => 
    post.tags.includes(tag)
  );
};

// Função para buscar posts
export const searchPosts = (posts: BlogPost[], query: string): BlogPost[] => {
  const searchTerm = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// Função para obter posts relacionados
export const getRelatedPosts = (posts: BlogPost[], currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  const relatedPosts = posts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      let score = 0;
      
      // Pontuação por categorias em comum
      const commonCategories = post.categories.filter(cat => 
        currentPost.categories.some(currentCat => currentCat.id === cat.id)
      );
      score += commonCategories.length * 3;
      
      // Pontuação por tags em comum
      const commonTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      );
      score += commonTags.length * 2;
      
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
    
  return relatedPosts;
};