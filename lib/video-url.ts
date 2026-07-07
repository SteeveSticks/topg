const YOUTUBE_PATTERN =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)[\w-]+(?:[?&][^\s]*)?$/i;

const VIMEO_PATTERN =
  /^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/\d+|player\.vimeo\.com\/video\/\d+)(?:[?&][^\s]*)?$/i;

export function isValidVideoEmbedUrl(url: string): boolean {
  const trimmed = url.trim();
  return YOUTUBE_PATTERN.test(trimmed) || VIMEO_PATTERN.test(trimmed);
}

function extractYouTubeVideoId(url: string): string | null {
  const trimmed = url.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]+)/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

function extractVimeoVideoId(url: string): string | null {
  const trimmed = url.trim();
  const match = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return match?.[1] ?? null;
}

export function getVideoThumbnailUrl(url: string): string {
  const youtubeId = extractYouTubeVideoId(url);

  if (youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }

  const vimeoId = extractVimeoVideoId(url);

  if (vimeoId) {
    return `https://vumbnail.com/${vimeoId}.jpg`;
  }

  return "/slide1.jpg";
}