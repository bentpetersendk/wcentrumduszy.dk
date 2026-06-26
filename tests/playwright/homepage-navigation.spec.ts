import { expect, test } from "@playwright/test";

test("desktop navigation exposes primary links and keyboard focus", async ({ page, browserName }, testInfo) => {
  test.skip(browserName === "webkit", "Skip-link focus assertion is unreliable in WebKit.");
  test.skip(testInfo.project.name.startsWith("mobile"), "Desktop navigation is intentionally hidden in mobile projects.");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link", { name: "About Joanna" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact Joanna" }).first()).toBeVisible();
});

test("mobile navigation opens, links are reachable, and escape closes it", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const openButton = page.getByRole("button", { name: "Open navigation menu" });
  await expect(openButton).toBeVisible();
  await openButton.click();

  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: "Family Constellations" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Workshops" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
});
