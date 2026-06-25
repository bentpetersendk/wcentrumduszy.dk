import type { SVGProps } from "react";

export type IconName =
  | "arrow"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "edit"
  | "globe"
  | "location"
  | "menu"
  | "play"
  | "search"
  | "upload"
  | "warning";

const paths: Record<IconName, string[]> = {
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
  calendar: ["M7 3v3", "M17 3v3", "M4 8h16", "M5 5h14v16H5z"],
  check: ["M5 12l4 4L19 6"],
  chevron: ["M8 10l4 4 4-4"],
  clock: ["M12 4a8 8 0 108 8 8 8 0 00-8-8z", "M12 8v5l3 2"],
  close: ["M6 6l12 12", "M18 6L6 18"],
  edit: ["M4 20h4l10-10-4-4L4 16z", "M13 7l4 4"],
  globe: ["M12 4a8 8 0 100 16 8 8 0 000-16z", "M4 12h16", "M12 4c2 2 3 5 3 8s-1 6-3 8", "M12 4c-2 2-3 5-3 8s1 6 3 8"],
  location: ["M12 21s6-5.5 6-11a6 6 0 10-12 0c0 5.5 6 11 6 11z", "M12 12a2 2 0 100-4 2 2 0 000 4z"],
  menu: ["M4 7h16", "M4 12h16", "M4 17h16"],
  play: ["M8 5v14l11-7z"],
  search: ["M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z", "M16 16l5 5"],
  upload: ["M12 16V4", "M7 9l5-5 5 5", "M5 20h14"],
  warning: ["M12 4l9 16H3z", "M12 9v5", "M12 17h.01"]
};

export function Icon({
  name,
  size = 20,
  label,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName; size?: number; label?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    >
      {paths[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

