import { UAParser } from "ua-parser-js";

export type DeviceType = "desktop" | "tablet" | "mobile";

export type UaInfo = {
  deviceType: DeviceType;
  os: string | null;
  browser: string | null;
};

/** Parses the User-Agent header into the device/OS/browser breakdown the dashboard reports on. */
export function parseUserAgent(userAgent: string | null): UaInfo {
  if (!userAgent) {
    return { deviceType: "desktop", os: null, browser: null };
  }
  const { device, os, browser } = UAParser(userAgent);
  const deviceType: DeviceType =
    device.type === "mobile" ? "mobile" : device.type === "tablet" ? "tablet" : "desktop";
  return {
    deviceType,
    os: os.name ?? null,
    browser: browser.name ?? null,
  };
}
