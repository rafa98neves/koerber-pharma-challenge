import { defineConfig } from 'vitest/config'
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from 'node:url';

export default defineConfig({
    plugins: [vue()],
    test: {
      environment: 'happy-dom'
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  },
)
