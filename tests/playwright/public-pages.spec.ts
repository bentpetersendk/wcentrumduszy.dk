import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { hasSupabaseEnv } from "./env";

const publicRoutes = [
  "/about",
  "/family-constellations",
  "/workshops",
  "/workshops/returning-to-yourself",
  "/courses",
  "/meditations",
  "/meditations/five-minute-pause",
  "/articles",
  "/articles/the-permission-to-pause",
  "/gallery",
  "/faq",
  "/contact",
  "/newsletter",
  "/legal/privacy",
  "/legal/cookies",
  "/legal/terms"
];

test.describe("public page coverage", () => {
  for (const route of publicRoutes) {
    test(`${route} renders without layout overflow`, async ({ page }) => {
      test.skip(!hasSupabaseEnv, "Public CMS routes require Supabase seeded content.");
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1")).toBeVisible();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(overflow).toBe(false);
    });
  }

  test("primary navigation follows the approved Phase 3 structure", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.startsWith("mobile"), "Desktop nav is replaced by the mobile drawer.");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(nav.getByRole("link", { name: "About Joanna" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Family Constellations" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Gallery" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Courses" })).toHaveCount(0);
  });

  test("contact and newsletter forms are keyboard reachable", async ({ page }) => {
    test.skip(!hasSupabaseEnv, "Form persistence requires Supabase environment.");
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Joanna");
    await page.getByLabel("Email").fill("hello@example.com");
    await page.getByLabel("Topic").selectOption("General question");
    await page.getByLabel("Message").fill("A quiet first hello.");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("status")).toContainText("CMS foundation");

    await page.goto("/newsletter");
    await page.getByLabel("Email address").fill("hello@example.com");
    await page.getByLabel("I agree to receive the W Centrum Duszy newsletter.").check();
    await page.getByRole("button", { name: "Join the newsletter" }).click();
    await expect(page.getByRole("status")).toContainText("Supabase");
  });

  test("representative public pages pass automated accessibility checks", async ({ page }) => {
    test.skip(!hasSupabaseEnv, "Public CMS routes require Supabase seeded content.");
    for (const route of ["/about", "/workshops/returning-to-yourself", "/contact"]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze();
      expect(results.violations).toEqual([]);
    }
  });
});
