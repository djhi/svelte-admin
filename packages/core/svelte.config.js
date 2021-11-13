/** @type {import('@sveltejs/kit').Config} */
const config = {
  package: {
    dir: "package",
    emitTypes: true,
    // excludes all .d.ts and files starting with _ as the name
    exports: (filepath) => !/^_|\/_|\.d\.ts$/.test(filepath),
    files: () => true,
  },
};

export default config;
