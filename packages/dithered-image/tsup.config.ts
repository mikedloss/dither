import { defineConfig } from "tsup";

export default defineConfig([
  // Vanilla entry — no React, no "use client" banner
  {
    entry: { vanilla: "src/vanilla.ts" },
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    clean: true,
    external: ["react"],
  },
  // React entries (hook + component) — includes "use client" banner
  {
    entry: {
      index: "src/index.ts",
      react: "src/react.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    clean: false,
    external: ["react"],
    banner: {
      js: '"use client";',
    },
  },
]);
