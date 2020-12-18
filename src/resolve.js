import { join } from "path";
import { readFile } from "fs/promises";
import { exportMap } from "./export-map";
import { cache, addDefaultExtension } from "./utils";

const cwd = process.cwd();

const defaultModuleFolder = join(cwd, "node_modules");

export const packageName = /(@[^\/]+\/[^\/]+|[^\/]+)(?:\/){0,1}(.*)/;

/**
 * Resolve the files of a package
 * @param {string} npm - name of the package to solve
 * @param {string} [moduleFolder] - allows to replace the module resolution path
 * @param {string} [pkgFileName] - allows replacing the name of the package.json, used for test.
 */
export async function resolve(
    npm,
    moduleFolder = defaultModuleFolder,
    pkgFileName = "package.json"
) {
    const [, folder, subpathname] = npm.match(packageName);

    const id = join(moduleFolder, folder, pkgFileName);

    const pkg = await cache(id + "#pkg", async () =>
        JSON.parse(await readFile(id, "utf-8"))
    );
    let file = "";
    if (!subpathname && pkg.module) {
        file = pkg.module;
    } else if (typeof pkg.exports == "object") {
        file =
            pkg.exports.import ||
            pkg.exports.default ||
            exportMap(pkg.exports, subpathname) ||
            subpathname ||
            "index";
    }
    return join(moduleFolder, folder, addDefaultExtension(file, ".js"));
}