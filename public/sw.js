// Service Worker para cache e funcionalidade offline

const CACHE_NAME = 'dev-portfolio-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const IMAGE_CACHE = 'images-v1';

// Recursos para cache estático (sempre em cache)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html', // Página offline personalizada
];

// Recursos para cache dinâmico (cache conforme uso)
const DYNAMIC_ASSETS = [
  '/assets/',
  '/api/',
];

// Estratégias de cache
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Configuração de cache por tipo de recurso
const CACHE_CONFIG = {
  html: {
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    cacheName: DYNAMIC_CACHE,
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    maxEntries: 50
  },
  css: {
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cacheName: STATIC_CACHE,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    maxEntries: 20
  },
  js: {
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cacheName: STATIC_CACHE,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    maxEntries: 50
  },
  images: {
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cacheName: IMAGE_CACHE,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
    maxEntries: 100
  },
  api: {
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    cacheName: DYNAMIC_CACHE,
    maxAge: 5 * 60 * 1000, // 5 minutos
    maxEntries: 50
  }
};

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Cache estático criado');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Recursos estáticos em cache');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Erro na instalação', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Remove caches antigos
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('Service Worker: Removendo cache antigo', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Ativado');
        return self.clients.claim();
      })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora requisições não-HTTP
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Determina o tipo de recurso e estratégia de cache
  const resourceType = getResourceType(request);
  const config = CACHE_CONFIG[resourceType] || CACHE_CONFIG.html;
  
  event.respondWith(
    handleRequest(request, config)
      .catch(() => {
        // Fallback para página offline em caso de erro
        if (request.destination === 'document') {
          return caches.match('/offline.html');
        }
        
        // Fallback para imagens
        if (request.destination === 'image') {
          return new Response(
            '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af">Imagem indisponível</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
        
        return new Response('Recurso indisponível offline', { status: 503 });
      })
  );
});

// Determina o tipo de recurso baseado na requisição
function getResourceType(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  if (request.destination === 'image' || pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) {
    return 'images';
  }
  
  if (pathname.match(/\.css$/i)) {
    return 'css';
  }
  
  if (pathname.match(/\.js$/i)) {
    return 'js';
  }
  
  if (pathname.startsWith('/api/') || url.searchParams.has('api')) {
    return 'api';
  }
  
  return 'html';
}

// Manipula requisições baseado na estratégia de cache
async function handleRequest(request, config) {
  const { strategy, cacheName, maxAge, maxEntries } = config;
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, cacheName, maxAge, maxEntries);
      
    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, cacheName, maxAge, maxEntries);
      
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request, cacheName, maxAge, maxEntries);
      
    case CACHE_STRATEGIES.NETWORK_ONLY:
      return fetch(request);
      
    case CACHE_STRATEGIES.CACHE_ONLY:
      return caches.match(request);
      
    default:
      return networkFirst(request, cacheName, maxAge, maxEntries);
  }
}

// Estratégia Cache First
async function cacheFirst(request, cacheName, maxAge, maxEntries) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse, maxAge)) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      await cleanupCache(cache, maxEntries);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Estratégia Network First
async function networkFirst(request, cacheName, maxAge, maxEntries) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      await cleanupCache(cache, maxEntries);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse && !isExpired(cachedResponse, maxAge)) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidate(request, cacheName, maxAge, maxEntries) {
  const cachedResponse = await caches.match(request);
  
  // Atualiza em background
  const fetchPromise = fetch(request)
    .then(async (networkResponse) => {
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        await cleanupCache(cache, maxEntries);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => {
      // Ignora erros de rede em background
    });
  
  // Retorna cache se disponível, senão espera pela rede
  if (cachedResponse && !isExpired(cachedResponse, maxAge)) {
    return cachedResponse;
  }
  
  return fetchPromise;
}

// Verifica se uma resposta em cache expirou
function isExpired(response, maxAge) {
  if (!maxAge) return false;
  
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return false;
  
  const date = new Date(dateHeader);
  const now = new Date();
  
  return (now.getTime() - date.getTime()) > maxAge;
}

// Limpa cache antigo mantendo apenas as entradas mais recentes
async function cleanupCache(cache, maxEntries) {
  if (!maxEntries) return;
  
  const keys = await cache.keys();
  
  if (keys.length >= maxEntries) {
    // Remove as entradas mais antigas
    const entriesToDelete = keys.slice(0, keys.length - maxEntries + 1);
    
    await Promise.all(
      entriesToDelete.map(key => cache.delete(key))
    );
  }
}

// Manipula mensagens do cliente
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_CACHE_SIZE':
      getCacheSize().then(size => {
        event.ports[0].postMessage({ type: 'CACHE_SIZE', payload: size });
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      });
      break;
      
    case 'PRELOAD_RESOURCES':
      preloadResources(payload.resources);
      break;
  }
});

// Obtém tamanho total do cache
async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    totalSize += keys.length;
  }
  
  return totalSize;
}

// Limpa todos os caches
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
}

// Preload de recursos
async function preloadResources(resources) {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  const preloadPromises = resources.map(async (resource) => {
    try {
      const response = await fetch(resource);
      if (response.ok) {
        await cache.put(resource, response);
      }
    } catch (error) {
      console.warn('Falha no preload de', resource, error);
    }
  });
  
  await Promise.all(preloadPromises);
}

// Notifica clientes sobre atualizações
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_UPDATE') {
    // Verifica se há uma nova versão disponível
    self.registration.update().then(() => {
      event.ports[0].postMessage({ 
        type: 'UPDATE_AVAILABLE',
        payload: self.registration.waiting !== null
      });
    });
  }
});

console.log('Service Worker: Carregado e pronto!');