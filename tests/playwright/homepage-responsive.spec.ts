import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { deviceProfiles } from "./device-matrix";

test.describe("homepage responsive QA", () => {
  for (const profile of deviceProfiles) {
    test(`${profile.name} renders without overflow, clipping, or accessibility violations`, async ({ browser }, testInfo) => {
      test.skip(testInfo.project.name !== "chromium", "Full device matrix runs once in desktop Chromium.");

      const context = await browser.newContext({
        ...profile.options,
        reducedMotion: "reduce"
      });
      const page = await context.newPage();

      const consoleErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") {
          consoleErrors.push(message.text());
        }
      });

      await page.goto("/", { waitUntil: "networkidle" });
      await expect(page).toHaveTitle(/W Centrum Duszy/);
      await expect(page.getByRole("heading", { name: "Return to the quiet center within you." })).toBeVisible();
      await expect(page.getByRole("link", { name: "Explore workshops" }).first()).toBeVisible();

      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        return Math.max(root.scrollWidth, body.scrollWidth) - root.clientWidth;
      });
      expect(overflow, `${profile.name} should not create horizontal scroll`).toBeLessThanOrEqual(1);

      const clippedText = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a, button, h1, h2, h3, p, label, figcaption"))
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden";
          })
          .filter((element) => {
            const style = window.getComputedStyle(element);
            return (
              !element.closest("[aria-hidden='true']") &&
              !element.classList.contains("sr-only") &&
              style.position !== "absolute"
            );
          })
          .map((element) => ({
            text: element.textContent?.trim().slice(0, 80) ?? element.tagName,
            clippedX: element.scrollWidth - element.clientWidth,
            clippedY: element.scrollHeight - element.clientHeight
          }))
          .filter((item) => item.clippedX > 1)
      );
      expect(clippedText, `${profile.name} should not clip visible text`).toEqual([]);

      const axe = await new AxeBuilder({ page }).analyze();
      expect(axe.violations).toEqual([]);

      expect(consoleErrors).toEqual([]);
      await context.close();
    });
  }
});
