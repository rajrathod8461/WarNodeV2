/** Append ?v= so navbar/footer pick up replaced files in public/meta (Next Image cache bust). */
export function withLogoVersion(path: string, version?: string): string {
  if (!version) return path
  const separator = path.includes("?") ? "&" : "?"
  return `${path}${separator}v=${encodeURIComponent(version)}`
}
