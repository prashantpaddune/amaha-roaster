import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
    cleanup();
});

vi.mock("react", async (importOriginal: () => any) => {
    const testCache = <T extends (...args: unknown[]) => unknown>(func: T) =>
    func;
    // @ts-ignore
    const originalModule = await importOriginal<typeof import("react")>();
    return {
        ...originalModule,
        cache: testCache,
    };
});

vi.stubGlobal("scroll", vi.fn());

