# @uppercod/replace-import

utilities for the replacement of imports in js files.

## Example

### @uppercod/replace-import

```js
import { readFile } from "fs/promise";
import { replaceImport } from "@uppercod/replace-import";

readFile("my.js", "utf8").then((code) => {
    replaceImport({
        code,
        /**
         * Resolve allows you to solve the import in a
         * personalized way, being useful to point to
         * a CDN or a local resource
         * @param {string} module  - Name of the module imported by the JS code
         * @return {string|Promise<string>}
         */
        async resolve(module) {
            return module;
        },
    });
});
```

### @uppercod/replace-import/export-map

It allows to solve a pkg from NPM based on the export format of [NodeJs#packages_self_referencing_a_package_using_its_name](https://nodejs.org/api/packages.html#packages_self_referencing_a_package_using_its_name).

```js
import { exportMap } from "@uppercod/replace-import/export-map";

const folders = {
    ".": "./core.js",
    "./html": "./html.js",
    "./utils/*": "./u/*.js",
};

exportMap(folders, ""); //"./core.js"
```

### @uppercod/replace-import/resolve

It allows to solve the NPM modules through the reading of NPM packages

```js
import { resolve } from "@uppercod/replace-import/resolve";

(await resolve("atomico")).href; // file://...node_modules/atomico/core.js
```
