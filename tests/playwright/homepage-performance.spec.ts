import { expect, test } from "@playwright/test";

test("homepage performance smoke budget", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const transferSize = resources.reduce((total, resource) => total + (resource.transferSize || 0), 0);

    return {
      domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.startTime : 0,
      load: navigation ? navigation.loadEventEnd - navigation.startTime : 0,
      transferSize
    };
  });

  expect(metrics.domContentLoaded).toBeLessThan(2500);
  expect(metrics.load).toBeLessThan(5000);
  expect(metrics.transferSize).toBeLessThan(4_000_000);
});
