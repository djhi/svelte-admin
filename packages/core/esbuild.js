const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");
const sveltePreprocess = require("svelte-preprocess");
const pkg = require("./package.json");

const commonOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  external: [
    "@svelte-admin/core",
    "@sveltestack/svelte-query",
    "inflection",
    "lodash",
    "svelte",
    "svelte/*",
    "svelte-forms-lib",
    "tinro",
  ],
  plugins: [
    sveltePlugin({
      preprocess: sveltePreprocess(),
    }),
  ],
};

if (process.env.WATCH) {
  commonOptions.watch = {
    onRebuild(error, result) {
      if (error)
        console.error("watch build failed for @svelte-admin/carbon:", error);
      else
        console.log("watch build succeeded  for @svelte-admin/carbon:", result);
    },
  };
}

(async () => {
  await esbuild.build({
    ...commonOptions,
    outfile: pkg.module,
    format: "esm",
  });

  await esbuild.build({
    ...commonOptions,
    outfile: pkg.main,
    format: "cjs",
  });
})();
