import { BlogPost, Category, Author, BlogMetadata } from '@/types/blog';

// Mock data - Em produção, isso viria de um CMS ou API
const mockAuthor: Author = {
  name: 'Desenvolvedor Full-Stack',
  bio: 'Especialista em desenvolvimento web moderno, automações e integrações de sistemas.',
  avatar: '/api/placeholder/100/100',
  social: {
    twitter: '@dev_fullstack',
    linkedin: 'linkedin.com/in/dev-fullstack',
    github: 'github.com/dev-fullstack'
  }
};

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'React',
    slug: 'react',
    description: 'Artigos sobre React e seu ecossistema',
    color: '#61DAFB'
  },
  {
    id: '2',
    name: 'Next.js',
    slug: 'nextjs',
    description: 'Framework React para produção',
    color: '#000000'
  },
  {
    id: '3',
    name: 'TypeScript',
    slug: 'typescript',
    description: 'JavaScript com tipagem estática',
    color: '#3178C6'
  },
  {
    id: '4',
    name: 'Automação',
    slug: 'automacao',
    description: 'Automação de processos e workflows',
    color: '#FF6B35'
  },
  {
    id: '5',
    name: 'APIs',
    slug: 'apis',
    description: 'Desenvolvimento e integração de APIs',
    color: '#4CAF50'
  },
  {
    id: '6',
    name: 'Performance',
    slug: 'performance',
    description: 'Otimização e performance web',
    color: '#FF9800'
  }
];

const mockPosts: BlogPost[] = [
  {
    slug: 'react-18-novas-funcionalidades',
    title: 'React 18: Explorando as Novas Funcionalidades',
    excerpt: 'Descubra as principais novidades do React 18, incluindo Concurrent Features, Suspense melhorado e novas hooks.',
    content: `# React 18: Explorando as Novas Funcionalidades

O React 18 trouxe mudanças significativas que revolucionam a forma como desenvolvemos aplicações React. Neste artigo, vamos explorar as principais novidades.

## Concurrent Features

As Concurrent Features são o destaque do React 18, permitindo que o React interrompa, pause e retome o trabalho de renderização conforme necessário.

\`\`\`jsx
import { startTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
    
    // Marca esta atualização como não urgente
    startTransition(() => {
      setList(generateList(e.target.value));
    });
  };

  return (
    <div>
      <input value={input} onChange={handleChange} />
      {isPending && <div>Carregando...</div>}
      <List items={list} />
    </div>
  );
}
\`\`\`

## Suspense para Data Fetching

O Suspense agora suporta data fetching de forma nativa, simplificando o carregamento assíncrono.

\`\`\`jsx
function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDetails />
      <Suspense fallback={<PostsSkeleton />}>
        <ProfilePosts />
      </Suspense>
    </Suspense>
  );
}
\`\`\`

## Automatic Batching

O React 18 agrupa automaticamente múltiplas atualizações de estado, melhorando a performance.

\`\`\`jsx
// Antes do React 18 - duas renderizações
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);

// React 18 - uma renderização (batching automático)
\`\`\`

## Conclusão

O React 18 representa um grande avanço na biblioteca, focando em performance e experiência do usuário. As Concurrent Features abrem novas possibilidades para criar interfaces mais responsivas e fluidas.`,
    author: mockAuthor,
    publishDate: new Date('2024-01-15'),
    categories: [mockCategories[0]],
    tags: ['react', 'javascript', 'frontend', 'performance'],
    readingTime: 8,
    featured: true,
    coverImage: '/api/placeholder/800/400',
    seoData: {
      title: 'React 18: Explorando as Novas Funcionalidades | Blog Tech',
      description: 'Descubra as principais novidades do React 18, incluindo Concurrent Features, Suspense melhorado e novas hooks.',
      keywords: ['react 18', 'concurrent features', 'suspense', 'javascript', 'frontend'],
      ogImage: '/api/placeholder/1200/630'
    }
  },
  {
    slug: 'nextjs-13-app-directory',
    title: 'Next.js 13: Guia Completo do App Directory',
    excerpt: 'Aprenda a usar o novo App Directory do Next.js 13, incluindo layouts, loading states e error boundaries.',
    content: `# Next.js 13: Guia Completo do App Directory

O Next.js 13 introduziu o App Directory, uma nova forma de estruturar aplicações que oferece mais flexibilidade e recursos avançados.

## Estrutura do App Directory

\`\`\`
app/
├── layout.tsx          # Layout raiz
├── page.tsx           # Página inicial
├── loading.tsx        # Loading UI
├── error.tsx          # Error UI
├── not-found.tsx      # 404 page
└── blog/
    ├── layout.tsx     # Layout do blog
    ├── page.tsx       # Lista de posts
    └── [slug]/
        └── page.tsx   # Post individual
\`\`\`

## Server Components por Padrão

No App Directory, todos os componentes são Server Components por padrão.

\`\`\`tsx
// app/blog/page.tsx
async function BlogPage() {
  const posts = await getPosts(); // Executa no servidor
  
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
\`\`\`

## Layouts Aninhados

\`\`\`tsx
// app/layout.tsx (Layout raiz)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// app/blog/layout.tsx (Layout do blog)
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-container">
      <BlogSidebar />
      <main>{children}</main>
    </div>
  );
}
\`\`\`

## Loading e Error States

\`\`\`tsx
// app/blog/loading.tsx
export default function Loading() {
  return <BlogSkeleton />;
}

// app/blog/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Algo deu errado!</h2>
      <button onClick={() => reset()}>Tentar novamente</button>
    </div>
  );
}
\`\`\`

## Conclusão

O App Directory do Next.js 13 oferece uma experiência de desenvolvimento mais intuitiva e recursos avançados para criar aplicações modernas e performáticas.`,
    author: mockAuthor,
    publishDate: new Date('2024-01-10'),
    categories: [mockCategories[1]],
    tags: ['nextjs', 'react', 'app-directory', 'server-components'],
    readingTime: 6,
    featured: true,
    coverImage: '/api/placeholder/800/400',
    seoData: {
      title: 'Next.js 13: Guia Completo do App Directory | Blog Tech',
      description: 'Aprenda a usar o novo App Directory do Next.js 13, incluindo layouts, loading states e error boundaries.',
      keywords: ['nextjs 13', 'app directory', 'server components', 'react', 'frontend'],
      ogImage: '/api/placeholder/1200/630'
    }
  },
  {
    slug: 'typescript-utility-types',
    title: 'TypeScript: Dominando Utility Types',
    excerpt: 'Explore os Utility Types do TypeScript e como eles podem tornar seu código mais robusto e reutilizável.',
    content: `# TypeScript: Dominando Utility Types

Os Utility Types do TypeScript são ferramentas poderosas que nos ajudam a transformar e manipular tipos de forma elegante e reutilizável.

## Partial<T>

Torna todas as propriedades de um tipo opcionais.

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Todas as propriedades se tornam opcionais
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

function updateUser(id: number, updates: PartialUser) {
  // Implementação
}

updateUser(1, { name: 'João' }); // ✅ Válido
updateUser(1, { email: 'joao@email.com', age: 30 }); // ✅ Válido
\`\`\`

## Required<T>

Torna todas as propriedades obrigatórias.

\`\`\`typescript
interface Config {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

type RequiredConfig = Required<Config>;
// { apiUrl: string; timeout: number; retries: number; }
\`\`\`

## Pick<T, K>

Seleciona apenas as propriedades especificadas.

\`\`\`typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>;
// { id: number; name: string; price: number; }
\`\`\`

## Omit<T, K>

Remove as propriedades especificadas.

\`\`\`typescript
type ProductWithoutId = Omit<Product, 'id'>;
// { name: string; price: number; description: string; category: string; }

type CreateProductRequest = Omit<Product, 'id'>;
\`\`\`

## Record<K, T>

Cria um tipo com chaves K e valores T.

\`\`\`typescript
type Status = 'pending' | 'approved' | 'rejected';
type StatusConfig = Record<Status, { color: string; label: string }>;

const statusConfig: StatusConfig = {
  pending: { color: 'yellow', label: 'Pendente' },
  approved: { color: 'green', label: 'Aprovado' },
  rejected: { color: 'red', label: 'Rejeitado' }
};
\`\`\`

## Exemplo Prático: API Response Handler

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Tipo para criação de usuário (sem id)
type CreateUserRequest = Omit<User, 'id'>;

// Tipo para atualização (campos opcionais)
type UpdateUserRequest = Partial<Omit<User, 'id'>>;

// Tipo para resposta pública (sem informações sensíveis)
type PublicUser = Pick<User, 'id' | 'name'>;

// Handlers tipados
async function createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
  // Implementação
}

async function updateUser(id: number, updates: UpdateUserRequest): Promise<ApiResponse<User>> {
  // Implementação
}

async function getPublicUsers(): Promise<ApiResponse<PublicUser[]>> {
  // Implementação
}
\`\`\`

## Conclusão

Os Utility Types do TypeScript são essenciais para criar código mais seguro, reutilizável e expressivo. Dominar essas ferramentas elevará significativamente a qualidade do seu código TypeScript.`,
    author: mockAuthor,
    publishDate: new Date('2024-01-05'),
    categories: [mockCategories[2]],
    tags: ['typescript', 'utility-types', 'tipos', 'javascript'],
    readingTime: 7,
    featured: false,
    coverImage: '/api/placeholder/800/400',
    seoData: {
      title: 'TypeScript: Dominando Utility Types | Blog Tech',
      description: 'Explore os Utility Types do TypeScript e como eles podem tornar seu código mais robusto e reutilizável.',
      keywords: ['typescript', 'utility types', 'tipos', 'javascript', 'programação'],
      ogImage: '/api/placeholder/1200/630'
    }
  },
  {
    slug: 'automacao-zapier-make',
    title: 'Automação com Zapier vs Make.com: Qual Escolher?',
    excerpt: 'Comparação detalhada entre Zapier e Make.com para automação de processos empresariais.',
    content: `# Automação com Zapier vs Make.com: Qual Escolher?

Quando se trata de automação de processos, Zapier e Make.com são duas das principais plataformas disponíveis. Vamos comparar suas características.

## Zapier: Simplicidade e Integração

### Vantagens
- Interface intuitiva e fácil de usar
- Maior número de integrações (5000+)
- Comunidade ativa e documentação extensa
- Ideal para automações simples

### Desvantagens
- Limitações em lógica complexa
- Preço mais alto para uso intensivo
- Menos flexibilidade em transformações de dados

\`\`\`javascript
// Exemplo de webhook no Zapier
const zapierWebhook = {
  url: 'https://hooks.zapier.com/hooks/catch/123456/abcdef/',
  method: 'POST',
  data: {
    name: 'João Silva',
    email: 'joao@exemplo.com',
    action: 'new_user'
  }
};
\`\`\`

## Make.com: Poder e Flexibilidade

### Vantagens
- Interface visual mais avançada
- Melhor para automações complexas
- Preço mais competitivo
- Maior controle sobre transformações de dados

### Desvantagens
- Curva de aprendizado mais íngreme
- Menos integrações que o Zapier
- Interface pode ser intimidante para iniciantes

\`\`\`javascript
// Exemplo de cenário no Make.com
const makeScenario = {
  trigger: {
    type: 'webhook',
    url: 'https://hook.make.com/abc123'
  },
  modules: [
    {
      type: 'filter',
      condition: 'email contains @empresa.com'
    },
    {
      type: 'transformer',
      operation: 'format_name'
    },
    {
      type: 'action',
      service: 'google_sheets',
      operation: 'add_row'
    }
  ]
};
\`\`\`

## Comparação Prática

| Aspecto | Zapier | Make.com |
|---------|--------|----------|
| Facilidade de uso | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Integrações | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Preço | ⭐⭐ | ⭐⭐⭐⭐ |
| Flexibilidade | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Automações complexas | ⭐⭐ | ⭐⭐⭐⭐⭐ |

## Quando Usar Cada Um

### Use Zapier quando:
- Precisa de automações simples
- Quer começar rapidamente
- Precisa de integrações específicas
- Tem orçamento flexível

### Use Make.com quando:
- Precisa de lógica complexa
- Quer economizar dinheiro
- Precisa de controle granular
- Tem tempo para aprender

## Conclusão

Ambas as plataformas têm seus méritos. Para a maioria dos casos de uso empresariais, recomendo começar com Make.com devido ao melhor custo-benefício e flexibilidade.`,
    author: mockAuthor,
    publishDate: new Date('2023-12-28'),
    categories: [mockCategories[3]],
    tags: ['automação', 'zapier', 'make.com', 'produtividade', 'workflows'],
    readingTime: 5,
    featured: false,
    coverImage: '/api/placeholder/800/400',
    seoData: {
      title: 'Automação com Zapier vs Make.com: Qual Escolher? | Blog Tech',
      description: 'Comparação detalhada entre Zapier e Make.com para automação de processos empresariais.',
      keywords: ['automação', 'zapier', 'make.com', 'workflows', 'produtividade'],
      ogImage: '/api/placeholder/1200/630'
    }
  }
];

// Função para calcular tempo de leitura
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Função para obter todos os posts
export async function getAllPosts(): Promise<BlogPost[]> {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

// Função para obter posts com paginação
export async function getPostsPaginated(
  page: number = 1, 
  limit: number = 6,
  sortBy: 'newest' | 'oldest' | 'popular' | 'reading-time' = 'newest'
): Promise<{ posts: BlogPost[], totalPages: number, totalPosts: number }> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let sortedPosts = [...mockPosts];
  
  // Aplicar ordenação
  switch (sortBy) {
    case 'oldest':
      sortedPosts.sort((a, b) => 
        new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
      );
      break;
    case 'popular':
      // Simular popularidade baseada em featured posts primeiro
      sortedPosts.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      });
      break;
    case 'reading-time':
      sortedPosts.sort((a, b) => a.readingTime - b.readingTime);
      break;
    case 'newest':
    default:
      sortedPosts.sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
      break;
  }
  
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = sortedPosts.slice(startIndex, endIndex);
  
  return {
    posts,
    totalPages,
    totalPosts
  };
}

// Função para obter post por slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockPosts.find(post => post.slug === slug) || null;
}

// Função para obter posts por categoria
export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockPosts.filter(post => 
    post.categories.some(cat => cat.slug === categorySlug)
  );
}

// Função para obter posts por tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockPosts.filter(post => 
    post.tags.includes(tag.toLowerCase())
  );
}

// Função para buscar posts
export async function searchPosts(query: string): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const searchTerm = query.toLowerCase();
  
  return mockPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.includes(searchTerm)) ||
    post.categories.some(cat => cat.name.toLowerCase().includes(searchTerm))
  );
}

// Função para obter posts em destaque
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockPosts.filter(post => post.featured);
}

// Função para obter posts recentes
export async function getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockPosts
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
}

// Função para obter todas as categorias
export async function getAllCategories(): Promise<Category[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockCategories;
}

// Função para obter todas as tags
export async function getAllTags(): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const allTags = mockPosts.flatMap(post => post.tags);
  return [...new Set(allTags)].sort();
}

// Função para obter metadados do blog
export async function getBlogMetadata(): Promise<BlogMetadata> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const allTags = await getAllTags();
  const recentPosts = await getRecentPosts();
  const featuredPosts = await getFeaturedPosts();
  
  return {
    totalPosts: mockPosts.length,
    categories: mockCategories,
    tags: allTags,
    recentPosts,
    featuredPosts
  };
}

// Função para obter posts relacionados
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const relatedPosts = mockPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      let score = 0;
      
      // Pontuação por categoria em comum
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
}