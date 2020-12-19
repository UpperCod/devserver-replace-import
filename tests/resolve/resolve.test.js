import test from "ava";
import { URL } from "url";
import { resolve, packageName } from "../../src/resolve.js";

const ModuleFolder = new URL("./test_modules/", import.meta.url);

test("Search expression 1", (t) => {
    const [, folder, subFolder] = "atomico/html".match(packageName);
    t.is(folder, "atomico");
    t.is(subFolder, "html");
});

test("Search expression 2", (t) => {
    const [, folder, subFolder] = "@atomico/html".match(packageName);
    t.is(folder, "@atomico/html");
    t.is(subFolder, "");
});

test("Search expression 3", (t) => {
    const [, folder, subFolder] = "@atomico/html/kit.js".match(packageName);
    t.is(folder, "@atomico/html");
    t.is(subFolder, "kit.js");
});

test("resolve 1", async (t) => {
    const m1 = await resolve("pkg-1", ModuleFolder, "pkg.json");

    t.is(new URL("pkg-1/lib/index.js", ModuleFolder).href, m1.href);

    const m2 = await resolve("pkg-1/lib", ModuleFolder, "pkg.json");

    t.is(new URL("pkg-1/lib/index.js", ModuleFolder).href, m2.href);

    const m3 = await resolve("pkg-1/lib/plops", ModuleFolder, "pkg.json");

    t.is(new URL("pkg-1/lib/plops.js", ModuleFolder).href, m3.href);
});

test("resolve 2", async (t) => {
    const m1 = await resolve("pkg-2", ModuleFolder, "pkg.json");

    t.is(new URL("pkg-2/module.js", ModuleFolder).href, m1.href);
});

test("resolve 3", async (t) => {
    const m1 = await resolve("pkg-3", ModuleFolder, "pkg.json");

    t.is(new URL("pkg-3/lib/index.js", ModuleFolder).href, m1.href);
});

test("resolve 3 - catch", async (t) => {
    try {
        const m1 = await resolve("pkg-5", ModuleFolder, "pkg.json");
    } catch (e) {
        t.pass();
    }
});
