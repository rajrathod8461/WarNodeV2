import { countryFlagUrl } from "../lib/countryFlags";

const sizePresets = {
  xs: { width: 20, height: 13, className: "h-3.5 w-[22px]" },
  sm: { width: 24, height: 16, className: "h-4 w-6" },
  md: { width: 32, height: 21, className: "h-5 w-8 sm:h-6 sm:w-9" },
  lg: { width: 40, height: 27, className: "h-6 w-9 lg:h-7 lg:w-11" },
  xl: { width: 48, height: 32, className: "h-8 w-12" },
} as const;

type FlagSize = keyof typeof sizePresets;

interface CountryFlagProps {
  code: string;
  alt: string;
  size?: FlagSize;
  width?: number;
  height?: number;
  className?: string;
}

/** Rectangular country flag (3:2) from jsDelivr CDN */
export function CountryFlag({
  code,
  alt,
  size = "sm",
  width,
  height,
  className = "",
}: CountryFlagProps) {
  const preset = sizePresets[size];
  const w = width ?? preset.width;
  const h = height ?? preset.height;

  return (
    <img
      src={countryFlagUrl(code)}
      alt={alt}
      width={w}
      height={h}
      className={`inline-block shrink-0 object-cover rounded-[2px] border border-black/10 dark:border-white/15 shadow-sm ${preset.className} ${className}`.trim()}
      loading="lazy"
      decoding="async"
    />
  );
}
