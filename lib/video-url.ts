const YOUTUBE_PATTERN =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)[\w-]+(?:[?&][^\s]*)?$/i;

const VIMEO_PATTERN =
  /^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/\d+|player\.vimeo\.com\/video\/\d+)(?:[?&][^\s]*)?$/i;

export function isValidVideoEmbedUrl(url: string): boolean {
  const trimmed = url.trim();
  return YOUTUBE_PATTERN.test(trimmed) || VIMEO_PATTERN.test(trimmed);
}