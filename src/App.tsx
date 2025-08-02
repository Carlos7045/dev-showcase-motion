import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LazyLoad } from '@/components/molecules/LazyLoad';
import { createLazyComponents } from '@/utils/lazyRoutes';

// Lazy load das páginas
const LazyIndex = React.lazy(() => import("@/pages/Index"));
const LazyNotFound = React.lazy(() => import("@/pages/NotFound"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <LazyLoad 
              skeleton 
              skeletonLines={8} 
              minHeight="100vh"
              delay={100}
            >
              <LazyIndex />
            </LazyLoad>
          } 
        />
        <Route 
          path="*" 
          element={
            <LazyLoad 
              minHeight="100vh"
              delay={0}
            >
              <LazyNotFound />
            </LazyLoad>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
