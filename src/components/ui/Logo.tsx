import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  priority?: boolean;
};

export function Logo({ priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
      aria-label="W Centrum Duszy home"
    >
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={42}
        height={42}
        priority={priority}
        className="h-10 w-10 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.32rem] text-text">W Centrum Duszy</span>
        <span className="mt-1 text-[0.72rem] uppercase tracking-[0.12em] text-text-muted">
          Joanna Radek-Petersen
        </span>
      </span>
    </Link>
  );
}

