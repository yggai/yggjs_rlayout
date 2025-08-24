import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'tech/index': 'src/tech/index.ts',
    'tech/button': 'src/tech/TechButton.tsx',
    'tech/card': 'src/tech/TechCard.tsx',
    'tech/layout': 'src/tech/TechLayout.tsx',
    'tech/header': 'src/tech/TechHeader.tsx',
    'tech/sidebar': 'src/tech/TechSidebar.tsx',
    'tech/menu': 'src/tech/TechMenu.tsx',
    'tech/search': 'src/tech/TechSearch.tsx',
    'tech/theme': 'src/tech/TechThemeProvider.tsx'
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  minify: 'terser',
  treeshake: true,
  external: ['react', 'react-dom'],
  onSuccess: async () => {
    console.log('✅ Build completed successfully');
    console.log('📊 Run "npm run bundle:size" to check bundle sizes');
  }
});