import { lazy, Suspense, ComponentType } from 'react';
import { motion } from 'framer-motion';

// Componente de loading personalizado
const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center min-h-[200px]"
  >
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </motion.div>
);

// Função utilitária para criar componentes lazy com loading personalizado
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ComponentType
) => {
  const LazyComponent = lazy(importFunc);
  
  return (props: any) => (
    <Suspense fallback={fallback ? <fallback /> : <LoadingSpinner />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Função para preload de componentes
export const preloadComponent = (importFunc: () => Promise<any>) => {
  const componentImport = importFunc();
  return componentImport;
};