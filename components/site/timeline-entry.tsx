import Image from "next/image";

import { cn } from "@/lib/utils";

interface TimelineEntryProps {
  title: string;
  description: string;
  imageUrl: string;
  side: "left" | "right";
}

function TextBlock({ title, description }: Pick<TimelineEntryProps, "title" | "description">) {
  return (
    <div className="px-4 md:px-8">
      <h3 className="mb-3 text-2xl font-bold text-brand md:text-3xl">{title}</h3>
      <p className="text-base leading-relaxed text-copy-secondary">{description}</p>
    </div>
  );
}

function ImageBlock({ title, imageUrl }: Pick<TimelineEntryProps, "title" | "imageUrl">) {
  return (
    <div className="px-4 md:px-8">
      <div className="overflow-hidden rounded-2xl bg-surface p-4 shadow-sm">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}

export function TimelineEntry({ title, description, imageUrl, side }: TimelineEntryProps) {
  const textColumn = <TextBlock title={title} description={description} />;
  const imageColumn = <ImageBlock title={title} imageUrl={imageUrl} />;

  return (
    <div className="relative grid grid-cols-1 items-center gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-14">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-10 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-4 ring-base md:block"
      />

      <div
        className={cn(
          side === "right" ? "md:order-1" : "md:order-2",
          "order-1",
        )}
      >
        {textColumn}
      </div>

      <div
        className={cn(
          side === "right" ? "md:order-2" : "md:order-1",
          "order-2",
        )}
      >
        {imageColumn}
      </div>
    </div>
  );
}