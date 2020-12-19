import pkg from "./package.json";

export default {
    input: [
        "./src/export-map.js",
        "./src/replace-import.js",
        "./src/resolve.js",
    ],
    external: Object.keys(pkg.dependencies),
    output: [
        {
            dir: "./",
            format: "cjs",
            sourcemap: true,
        },
    ],
};
