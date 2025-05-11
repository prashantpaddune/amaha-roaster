import path from "path";
import react from "@vitejs/plugin-react";
import {
    configDefaults,
    defineConfig,
    type ViteUserConfig,
} from "vitest/config";

export default defineConfig({
    plugins: [react(), stubNextAssetImport()] as ViteUserConfig["plugins"],

    test: {
        environment: "jsdom",
        setupFiles: ["./vitest-setup.ts"],
        exclude: [...configDefaults.exclude, "./e2e/**"],
        coverage: {
            exclude: ["./e2e/**", ],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});

function stubNextAssetImport() {
    return {
        name: "stub-next-asset-import",
        transform(_code: string, id: string) {
            if (/(jpg|jpeg|png|webp|gif|svg)$/.test(id)) {
                const imgSrc = path.relative(process.cwd(), id);
                return {
                    code: `export default { src: '${imgSrc}', height: 1, width: 1 }`,
                };
            }
        },
    };
}

process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";