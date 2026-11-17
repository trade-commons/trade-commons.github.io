import { site } from 'astro:config/server';

export function getAbsoluteUrl(url: string) {
  // The home page is returned without a trailing slash.
  return site && url === '/' ? site : new URL(url, site).href;
}

export function titleCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
