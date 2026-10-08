/** Public assets must stay inside the Vite base path on GitHub project Pages. */
export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

export function regionSrcSet(id: string) {
  return `${assetUrl(`assets/mobile/${id}.webp`)} 640w, ${assetUrl(`assets/${id}.webp`)} 1000w`;
}
