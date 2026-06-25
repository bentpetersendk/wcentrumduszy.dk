function channelToLinear(channel: number) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
}

export function getContrastRatio(foreground: string, background: string) {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);

  const fgLuminance =
    0.2126 * channelToLinear(fg.r) + 0.7152 * channelToLinear(fg.g) + 0.0722 * channelToLinear(fg.b);
  const bgLuminance =
    0.2126 * channelToLinear(bg.r) + 0.7152 * channelToLinear(bg.g) + 0.0722 * channelToLinear(bg.b);

  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

export function formatContrastRatio(ratio: number) {
  return `${ratio.toFixed(2)}:1`;
}

export function getWcagStatus(ratio: number) {
  if (ratio >= 4.5) {
    return "AA pass";
  }

  if (ratio >= 3) {
    return "Large text only";
  }

  return "Fail";
}

