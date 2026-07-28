import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === 'lib'

  return {
    plugins: [
      ...(isLibraryBuild
        ? [
            dts({
              tsconfigPath: './tsconfig.json',
              include: ['src'],
              exclude: ['src/tests', '**/*.test.*'],
              afterBuild: () => {
                copyFileSync('lib/index.d.ts', 'lib/index.d.cts')
              },
            }),
          ]
        : []),
    ],
    build: isLibraryBuild
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es', 'cjs'],
            fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
          },
          outDir: 'lib',
          sourcemap: true,
          minify: true,
          emptyOutDir: true,
        }
      : {
          outDir: 'dist',
          sourcemap: true,
          minify: true,
          emptyOutDir: true,
        },
  }
})
