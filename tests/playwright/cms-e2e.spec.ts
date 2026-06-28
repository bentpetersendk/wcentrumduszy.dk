import { expect, test } from "@playwright/test";
import { hasCmsE2EEnv } from "./env";

test.describe("live Supabase CMS E2E", () => {
  test.skip(!hasCmsE2EEnv, "Requires NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, CMS_E2E_EMAIL, and CMS_E2E_PASSWORD.");

  test("login, inspect homepage editor, create content, upload media, and logout", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill(process.env.CMS_E2E_EMAIL ?? "");
    await page.getByLabel("Password").fill(process.env.CMS_E2E_PASSWORD ?? "");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

    await page.getByRole("link", { name: "Homepage" }).click();
    await expect(page.getByRole("heading", { name: "Homepage editor" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Title", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Preview" })).toBeVisible();

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

  test("create, publish, unpublish, and republish an article", async ({ page }) => {
    const title = `E2E publish article ${Date.now()}`;
    const editedTitle = `${title} edited`;

    await page.goto("/admin/login");
    await page.getByLabel("Email").fill(process.env.CMS_E2E_EMAIL ?? "");
    await page.getByLabel("Password").fill(process.env.CMS_E2E_PASSWORD ?? "");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

    await page.goto("/admin/articles/new");
    await page.getByRole("textbox", { name: "Title", exact: true }).fill(title);
    await page.getByRole("textbox", { name: "Subtitle", exact: true }).fill("Publish workflow verification");
    await page.getByRole("textbox", { name: "Rich text blocks" }).fill("This article verifies the complete publish workflow.");
    await page.getByRole("button", { name: "Save Draft" }).click();
    await expect(page.getByRole("status")).toContainText("Saved");

    await page.getByRole("button", { name: "Publish" }).click();
    await expect(page.getByRole("status")).toContainText("Published");
    await expect(page.getByRole("button", { name: "Unpublish" })).toBeVisible();
    await expect(page).toHaveURL(/\/admin\/articles\/.+/);

    const editUrl = page.url();
    const slug = new URL(editUrl).pathname.split("/").at(-1);
    expect(slug).toBeTruthy();
    const publicPath = `/articles/${slug}`;

    await page.goto("/admin/articles");
    const publishedArticle = page.locator("article").filter({ hasText: title });
    await expect(publishedArticle).toContainText("Published");

    await page.goto(publicPath);
    await expect(page.getByRole("heading", { name: title })).toBeVisible();

    await page.goto(editUrl);
    await page.getByRole("textbox", { name: "Title", exact: true }).fill(editedTitle);
    await page.getByRole("button", { name: "Save Draft" }).click();
    await expect(page.getByRole("status")).toContainText("Saved");

    await page.getByRole("button", { name: "Unpublish" }).click();
    await expect(page.getByRole("status")).toContainText("Updated");
    await expect(page.getByRole("button", { name: "Publish" })).toBeVisible();

    await page.goto("/admin/articles");
    const draftArticle = page.locator("article").filter({ hasText: editedTitle });
    await expect(draftArticle).toContainText("Draft");

    await page.goto(publicPath);
    await expect(page.getByRole("heading", { name: "This page has moved out of view." })).toBeVisible();

    await page.goto(editUrl);
    await page.getByRole("button", { name: "Publish" }).click();
    await expect(page.getByRole("status")).toContainText("Published");

    await page.goto(publicPath);
    await expect(page.getByRole("heading", { name: editedTitle })).toBeVisible();
  });
});
