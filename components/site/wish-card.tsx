import Image from "next/image";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

type ColorTheme = "peach" | "teal";

interface WishCardBaseProps {
  author: string;
}

interface PhotoWishCardProps extends WishCardBaseProps {
  variant: "photo";
  caption: string;
  imageUrl: string;
}

interface MessageWishCardProps extends WishCardBaseProps {
  variant: "message";
  message: string;
  colorTheme: ColorTheme;
}

interface VideoWishCardProps extends WishCardBaseProps {
  variant: "video";
  caption: string;
  imageUrl: string;
  duration: string;
}

export type WishCardProps =
  | PhotoWishCardProps
  | MessageWishCardProps
  | VideoWishCardProps;

const messageThemeClasses: Record<ColorTheme, string> = {
  peach: "bg-accent-secondary",
  teal: "bg-accent-tertiary",
};

function FoldedCorner() {
  return (
    <>
      <span
        className="absolute top-0 right-0 size-0 border-t-[28px] border-l-[28px] border-t-white/25 border-l-transparent"
        aria-hidden="true"
      />
      <span
        className="absolute top-0 right-0 size-0 border-t-[20px] border-l-[20px] border-t-black/5 border-l-transparent"
        aria-hidden="true"
      />
    </>
  );
}

function MessageCard({ message, author, colorTheme }: MessageWishCardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 shadow-md",
        messageThemeClasses[colorTheme]
      )}
    >
      <FoldedCorner />
      <p className="mb-4 text-sm leading-relaxed text-copy-primary">
        {message}
      </p>
      <p className="text-sm font-semibold text-copy-primary">– {author}</p>
    </article>
  );
}

function PhotoCard({ caption, author, imageUrl }: PhotoWishCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-surface shadow-md">
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>
      <div className="px-5 py-4">
        <p className="mb-2 text-sm leading-relaxed text-copy-primary">
          &ldquo;{caption}&rdquo;
        </p>
        <p className="text-sm font-semibold text-copy-primary">– {author}</p>
      </div>
    </article>
  );
}

function VideoCard({
  caption,
  author,
  imageUrl,
  duration,
}: VideoWishCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-surface shadow-md">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-white/90 shadow-md">
            <Play className="ml-1 h-6 w-6 fill-copy-primary text-copy-primary" />
          </span>
        </div>
        <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
          {duration}
        </span>
      </div>
      <div className="px-5 py-4">
        <p className="mb-2 text-sm leading-relaxed text-copy-primary">
          &ldquo;{caption}&rdquo;
        </p>
        <p className="text-sm font-semibold text-copy-primary">– {author}</p>
      </div>
    </article>
  );
}

export function WishCard(props: WishCardProps) {
  switch (props.variant) {
    case "message":
      return <MessageCard {...props} />;
    case "photo":
      return <PhotoCard {...props} />;
    case "video":
      return <VideoCard {...props} />;
  }
}