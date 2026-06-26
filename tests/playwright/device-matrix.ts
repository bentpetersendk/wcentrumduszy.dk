import { devices, type BrowserContextOptions } from "@playwright/test";

export type DeviceProfile = {
  name: string;
  options: BrowserContextOptions;
};

const desktopUserAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

const androidUserAgent =
  "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36";

export const deviceProfiles: DeviceProfile[] = [
  { name: "iphone-se", options: devices["iPhone SE"] },
  { name: "iphone-12", options: devices["iPhone 12"] },
  { name: "iphone-13", options: devices["iPhone 13"] },
  { name: "iphone-14", options: devices["iPhone 14"] },
  { name: "iphone-15", options: devices["iPhone 15"] },
  { name: "iphone-15-pro", options: devices["iPhone 15 Pro"] },
  { name: "iphone-15-pro-max", options: devices["iPhone 15 Pro Max"] },
  { name: "iphone-16", options: devices["iPhone 16"] },
  { name: "ipad-mini", options: devices["iPad Mini"] },
  {
    name: "ipad-air",
    options: {
      viewport: { width: 820, height: 1180 },
      screen: { width: 820, height: 1180 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent: devices["iPad Mini"].userAgent
    }
  },
  { name: "ipad-pro", options: devices["iPad Pro 11"] },
  { name: "pixel-7", options: devices["Pixel 7"] },
  { name: "pixel-8", options: devices["Pixel 8"] },
  { name: "pixel-9", options: devices["Pixel 9"] },
  {
    name: "samsung-galaxy-s23",
    options: {
      viewport: { width: 360, height: 780 },
      screen: { width: 360, height: 780 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      userAgent: androidUserAgent
    }
  },
  { name: "samsung-galaxy-s24", options: devices["Galaxy S24"] },
  {
    name: "small-desktop",
    options: {
      viewport: { width: 1024, height: 768 },
      screen: { width: 1024, height: 768 },
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      userAgent: desktopUserAgent
    }
  },
  {
    name: "laptop",
    options: {
      viewport: { width: 1366, height: 768 },
      screen: { width: 1366, height: 768 },
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      userAgent: desktopUserAgent
    }
  },
  {
    name: "desktop-1440p",
    options: {
      viewport: { width: 1440, height: 900 },
      screen: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      userAgent: desktopUserAgent
    }
  },
  {
    name: "ultra-wide-desktop",
    options: {
      viewport: { width: 1920, height: 1080 },
      screen: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      userAgent: desktopUserAgent
    }
  }
];
