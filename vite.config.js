import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        wp_editor_css: path.resolve(__dirname, 'assets/scss/wp-editor.scss'),
        wp_admin_css: path.resolve(__dirname, 'assets/scss/wp-admin.scss'),
        editor: path.resolve(__dirname, 'assets/js/editor.jsx'),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.facadeModuleId.endsWith('.scss')) {
            return '[name].css'; // Voor SCSS/CSS-bestanden
          }
          if (chunk.facadeModuleId.endsWith('.jsx')) {
            return '[name].js'; // Voor SCSS/CSS-bestanden
          }
          return '[name].js'; // Voor JS-bestanden
        },
        assetFileNames: '[name].[ext]',
        chunkFileNames: 'dist/[name].[hash].js',
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
});