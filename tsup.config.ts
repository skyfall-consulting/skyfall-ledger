import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'charts/index': 'src/charts/index.ts',
    'icons/index': 'src/icons/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true,
  treeshake: true,
  external: ['react', 'react-dom', 'recharts', 'lucide-react'],
  esbuildOptions(options) {
    // Ledger components touch the DOM (Recharts ResponsiveContainer, theme provider).
    // Banner makes the package safe to import directly inside Next.js App Router server components.
    options.banner = {
      js: '"use client";',
    };
  },
});
