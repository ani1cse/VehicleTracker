import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/VehicleTracker/'
  //base: process.env.NODE_ENV === "production" ? "/VehicleTracker/" : "/",
});
