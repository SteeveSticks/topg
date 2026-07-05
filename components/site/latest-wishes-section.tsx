import { ScrollWishesGallery } from "@/components/site/scroll-wishes-gallery";
import PaperLines from "@/public/paper-lines-removebg-preview.png";
import Image from "next/image";

export function LatestWishesSection() {
  return (
    <main>
      <section className="relative px-6 pb-0 -mt-20">
        <div className="relative mx-auto flex max-w-6xl items-center justify-center">
          <div className="relative inline-flex -rotate-94">
            <Image
              src={PaperLines}
              alt="paper lines"
              width={300}
              height={300}
              className="opacity-20"
            />
          </div>
          <div className="absolute top-60 left-1/2 -translate-x-1/2">
            <h2 className="px-4 text-center text-4xl font-bold text-copy-primary">
              Latest Wishes
            </h2>
            <p className="text-center text-sm text-copy-secondary">
              The people who loves you the most have sent their wishes for you.
            </p>
          </div>
        </div>
      </section>
      <ScrollWishesGallery />
    </main>
  );
}
