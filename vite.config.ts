import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeHighlight,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }]
      ],
    }),
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          'animation-vendor': ['framer-motion'],
          'query-vendor': ['@tanstack/react-query'],
          'helmet-vendor': ['react-helmet-async'],
          
          // Feature chunks
          'seo-utils': [
            './src/utils/structuredData.ts',
            './src/utils/canonicalUrl.ts',
            './src/utils/socialMediaPreview.ts',
            './src/utils/ogImageGenerator.ts',
            './src/utils/twitterCards.ts'
          ],
          'image-utils': [
            './src/utils/imageOptimization.ts',
            './src/components/OptimizedImage.tsx'
          ],
          'lazy-utils': [
            './src/utils/lazyRoutes.ts',
            './src/components/LazyLoad.tsx',
            './src/components/RouteLoader.tsx'
          ]
        }
      }
    },
    // Otimizações de build
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production'
      }
    },
    // Configurações de chunk
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096
  },
  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
      'react-helmet-async'
    ]
  }
}));
