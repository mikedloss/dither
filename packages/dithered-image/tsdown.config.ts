import { defineConfig } from "tsdown";

export default defineConfig([
  // Vanilla entry — no React, no "use client" banner
  {
    entry: { vanilla: "src/vanilla.ts" },
    format: ["esm", "cjs"],
  },
  // React entries (hook + component) — includes "use client" banner
  {
    entry: {
      index: "src/index.ts",
      react: "src/react.ts",
    },
    format: ["esm", "cjs"],
    clean: false,
    banner: {
      js: '"use client";',
    },
  },
]);
