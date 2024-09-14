// https://vitejs.dev/guide/build.html#library-mode
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.js'),
      name: 'kaifui',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['kaif'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          kaif: 'Kaif',
        },
      },
    },
  },
})
