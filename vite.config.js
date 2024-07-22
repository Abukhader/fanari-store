import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import terser from "@rollup/plugin-terser";
import cssnano from "cssnano";

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    rollupOptions: {
      input: {
        main: "src/main.jsx",
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/large-library")) {
            return "large-library";
          }
        },
      },
      external: [
        "@emotion/styled",
        // إضافة `source-map-js` هنا إن كانت تستخدم كمكتبة خارجية
        "source-map-js",
      ],
      plugins: [terser()],
    },
    css: {
      postcss: {
        plugins: [cssnano()],
      },
    },
  },
  optimizeDeps: {
    include: [
      // تأكد من إضافة `source-map-js` هنا إذا كنت بحاجة إلى استيرادها في كود العميل
      "source-map-js",
    ],
    preconnect: [
      "https://sama-tek.com",
      "https://fanari-store.com",
      "https://www.fanari-store.com",
    ],
  },
});
