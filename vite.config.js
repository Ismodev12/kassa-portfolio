import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En développement, /admin et /admin/ ouvrent l'interface d'administration (public/admin/index.html).
// En ligne, c'est Netlify qui s'en charge (voir netlify.toml).
const adminRoute = () => ({
  name: 'admin-route',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/admin' || req.url === '/admin/') req.url = '/admin/index.html';
      next();
    });
  },
});

export default defineConfig({ plugins: [react(), adminRoute()] });
