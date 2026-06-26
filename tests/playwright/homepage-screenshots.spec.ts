import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { deviceProfiles } from "./device-matrix";

const screenshotDir = path.join(process.cwd(), "docs", "reviews", "screenshots", "mobile-qa");

test.describe("homepage screenshot evidence", () => {
  for (const profile of deviceProfiles) {
    test(`captures ${profile.name}`, async ({ browser }, testInfo) => {
      test.skip(testInfo.project.name !== "chromium", "Screenshot evidence is captured once in desktop Chromium.");

      await mkdir(screenshotDir, { recursive: true });
      const context = await browser.newContext({
        ...profile.options,
        reducedMotion: "reduce"
      });
      const page = await context.newPage();

      await page.goto("/", { waitUntil: "networkidle" });
      await expect(page.getByRole("heading", { name: "Return to the quiet center within you." })).toBeVisible();
      await page.evaluate(async () => {
        const step = Math.max(window.innerHeight * 0.75, 300);
        for (let position = 0; position < document.body.scrollHeight; position += step) {
          window.scrollTo(0, position);
          await new Promise((resolve) => window.setTimeout(resolve, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: path.join(screenshotDir, `${profile.name}.png`),
        fullPage: true
      });
      await context.close();
    });
  }
});
