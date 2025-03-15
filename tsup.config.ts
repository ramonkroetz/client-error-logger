import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  outDir: 'lib',
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  external: ['axios', 'bowser', 'utils'],
  platform: 'browser',
  minify: true,
  tsconfig: 'tsconfig.json',
})
