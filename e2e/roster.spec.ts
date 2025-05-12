import { test, expect } from '@playwright/test';
import { PROVIDERS_DATA } from "@/data/providers";

test.describe('Amaha Roster Management', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('renders all provider cards', async ({ page }) => {
        const cards = page.locator('[data-test-id="provider-card"]');
        await expect(cards).toHaveCount(PROVIDERS_DATA.length);
    });

    test('filter by service type', async ({ page }) => {
        await page.selectOption('select[name="service"]', 'psychiatrist');
        await page.getByRole('button', { name: "Apply" }).click();
        const filtered = PROVIDERS_DATA.filter(p => p.provider_usertype === 'psychiatrist');
        const cards = page.locator('[data-test-id="provider-card"]');
        await expect(cards).toHaveCount(filtered.length);
    });

    test('search by provider name', async ({ page }) => {
        await page.fill('input[name="search"]', 'Aarushi');
        const cards = page.locator('[data-test-id="provider-card"]');
        await expect(cards).toHaveCount(1);
        await expect(cards.first()).toContainText('Dr. Aarushi Sharma');
    });

    test('opens calendar view for a provider', async ({ page }) => {
        await page.getByRole('link', { name: /view calendar/i }).first().click();

        await expect(page).toHaveURL(/\/provider\/\d+/);

        await expect(page.locator('[data-test-id="calendar-view"]')).toBeVisible();
    });

});
