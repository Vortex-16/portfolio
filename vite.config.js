import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    // Raise the warning threshold — Vanta+Three are now async chunks
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        // Strip all console.* calls from the production build
        drop_console: true,
        drop_debugger: true,
        // Inline small functions for extra savings
        passes: 2,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js + Vanta — large async bundle, keep together
          if (id.includes('node_modules/three') || id.includes('node_modules/vanta')) {
            return 'vendor-three';
          }
          // Framer Motion — used across pages
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          // GSAP
          if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) {
            return 'vendor-gsap';
          }
          // React Router
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/@remix-run')) {
            return 'vendor-router';
          }
          // Core React — let Rollup handle this automatically to avoid circular deps
          // (do NOT manually chunk react/react-dom here)
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
  },
})
