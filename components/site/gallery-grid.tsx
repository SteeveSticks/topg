import Image from "next/image";

import {
  getGalleryPlaceholderImage,
  type GalleryImageItem,
} from "@/lib/gallery-images";

interface GalleryGridProps {
  items: GalleryImageItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={`${item.source}-${item.id}`}>
          <article className="overflow-hidden rounded-sm bg-surface shadow-md">
            <div className="relative aspect-square w-full">
              <Image
                src={getGalleryPlaceholderImage(index)}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <p className="px-4 py-3 text-sm text-copy-secondary">
              {item.caption}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}