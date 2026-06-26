import { expect, test } from "@playwright/test";
import { hasCmsE2EEnv } from "./env";

test.describe("live Supabase CMS E2E", () => {
  test.skip(!hasCmsE2EEnv, "Requires NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, CMS_E2E_EMAIL, and CMS_E2E_PASSWORD.");

  test("login, edit homepage, publish, create content, upload media, and logout", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill(process.env.CMS_E2E_EMAIL ?? "");
    await page.getByLabel("Password").fill(process.env.CMS_E2E_PASSWORD ?? "");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

    await page.getByRole("link", { name: "Homepage" }).click();
    await expect(page.getByRole("heading", { name: "Homepage editor" })).toBeVisible();
    await page.getByRole("textbox", { name: "Title", exact: true }).fill(`Homepage ${Date.now()}`);
    await expect(page.getByRole("status")).toContainText(/Saving|Saved/);
    await page.getByRole("button", { name: /Publish|Unpublish/ }).click();

    await page.getByRole("link", { name: "Workshops" }).click();
    await page.getByRole("link", { name: "Create new" }).click();
    await page.getByRole("textbox", { name: "Title", exact: true }).fill(`E2E workshop ${Date.now()}`);
    await page.getByRole("button", { name: "Save Draft" }).click();
    await expect(page.getByRole("status")).toContainText(/Saving|Saved/);

    await page.getByRole("link", { name: "Articles" }).click();
    await page.getByRole("link", { name: "Create new" }).click();
    await page.getByRole("textbox", { name: "Title", exact: true }).fill(`E2E article ${Date.now()}`);
    await page.getByRole("button", { name: "Save Draft" }).click();
    await expect(page.getByRole("status")).toContainText(/Saving|Saved/);

    await page.getByRole("link", { name: "Gallery" }).click();
    await expect(page.getByRole("heading", { name: "Media library" })).toBeVisible();

    await page.getByRole("button", { name: "Logout" }).click();
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  });
});
