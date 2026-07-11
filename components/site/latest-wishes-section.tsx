import { ScrollWishesGallery } from "@/components/site/scroll-wishes-gallery";
import PaperLines from "@/public/paper-lines.webp";
import Image from "next/image";

interface LatestWishesSectionProps {
  imageUrls?: string[];
}

export function LatestWishesSection({ imageUrls = [] }: LatestWishesSectionProps) {
  return (
    <main>
      <section className="relative -mt-20 px-4 pb-0 sm:px-6">
        <div className="relative mx-auto flex max-w-6xl items-center justify-center py-10 sm:py-14 md:py-0">
          <div className="relative inline-flex w-full max-w-[220px] -rotate-94 sm:max-w-[260px] md:max-w-[300px]">
            <Image
              src={PaperLines}
              alt="paper lines"
              width={300}
              height={300}
              className="h-auto w-full opacity-20"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-2xl font-bold text-copy-primary sm:text-3xl md:text-4xl">
              Latest Wishes
            </h2>
            <p className="mt-2 max-w-[22rem] text-xs text-copy-secondary sm:text-sm">
              The people who loves you the most have sent their wishes for you.
            </p>
          </div>
        </div>
      </section>
      <ScrollWishesGallery imageUrls={imageUrls} />
    </main>
  );
}