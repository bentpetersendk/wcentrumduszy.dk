import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { hasCmsE2EEnv, hasSupabaseEnv } from "./env";

test.describe("CMS foundation", () => {
  test("admin dashboard and editor workflow render", async ({ page }) => {
    test.skip(!hasCmsE2EEnv, "Requires production CMS credentials.");
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill(process.env.CMS_E2E_EMAIL ?? "");
    await page.getByLabel("Password").fill(process.env.CMS_E2E_PASSWORD ?? "");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await page.getByRole("link", { name: "Homepage" }).click();
    await expect(page.getByRole("heading", { name: "Homepage editor" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Title", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Preview" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Publish|Unpublish/ })).toBeVisible();
  });

  test("admin login reports missing Supabase configuration gracefully", async ({ page }) => {
    test.skip(hasSupabaseEnv, "Only applies to local runs without Supabase env.");
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill("editor@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("status")).toContainText("Supabase environment variables are not configured.");
  });

  test("admin pages pass automated accessibility smoke test", async ({ page }) => {
    await page.goto("/admin");
    const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze();
    expect(results.violations).toEqual([]);
  });
});
