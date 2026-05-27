export const COUNTRY_FLAG_CDN =
  "https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg";

/** ISO 3166-1 alpha-2 code → jsDelivr SVG flag URL */
export function countryFlagUrl(code: string): string {
  const normalized = code.trim().toLowerCase();
  if (normalized.startsWith("http")) {
    return normalized;
  }
  return `${COUNTRY_FLAG_CDN}/${normalized}.svg`;
}
