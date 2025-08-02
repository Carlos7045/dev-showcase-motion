import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, useEffect } from "react";
import { initGA, trackPageView } from "@/config/analytics";
import { LazyPages } from "@/utils/lazyRoutes";
import { RouteLoader, RouteErrorBoundary } from "@/components/RouteLoader";
import { ServiceWorkerNotifications } from "@/components/UpdateNotification";
import { setupIntelligentPreload } from "@/utils/lazyRoutes";
import { AnimationProvider } from "@/components/AnimationProvider";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Inicializar Google Analytics
    initGA();
    // Rastrear página inicial
    trackPageView(window.location.pathname);
    
    // Configurar preload inteligente
    setupIntelligentPreload();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <AnimationProvider>
            <RouteErrorBoundary>
              <Toaster />
              <Sonner />
              <ServiceWorkerNotifications />
              <BrowserRouter>
                <Suspense fallback={<RouteLoader />}>
                  <Routes>
                    <Route path="/" element={<LazyPages.Index />} />
                    
                    {/* Páginas de serviços */}
                    <Route path="/desenvolvimento-web" element={<LazyPages.DesenvolvimentoWeb />} />
                    <Route path="/automacoes" element={<LazyPages.Automacoes />} />
                    <Route path="/integracoes" element={<LazyPages.Integracoes />} />
                    <Route path="/consultoria" element={<LazyPages.Consultoria />} />
                    
                    {/* Blog */}
                    <Route path="/blog" element={<LazyPages.Blog />} />
                    <Route path="/blog/categoria/:categorySlug" element={<LazyPages.BlogCategory />} />
                    <Route path="/blog/tag/:tagSlug" element={<LazyPages.BlogTag />} />
                    <Route path="/blog/:slug" element={<LazyPages.BlogPost />} />
                    
                    {/* Portfolio */}
                    <Route path="/portfolio" element={<LazyPages.Portfolio />} />
                    <Route path="/portfolio/:slug" element={<LazyPages.PortfolioProject />} />
                    
                    {/* Contato */}
                    <Route path="/contato" element={<LazyPages.Contact />} />
                    
                    {/* Teste de animações */}
                    <Route path="/animation-test" element={<LazyPages.AnimationTest />} />
                    
                    {/* 404 - Deve ser a última rota */}
                    <Route path="*" element={<LazyPages.NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </RouteErrorBoundary>
          </AnimationProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
