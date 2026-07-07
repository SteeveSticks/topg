import Image from "next/image";

interface MemoryLaneHeroProps {
  imageUrls: string[];
}

export function MemoryLaneHero({ imageUrls }: MemoryLaneHeroProps) {
  const mobileImage = imageUrls[0];
  const desktopImages = imageUrls.slice(0, 4);
  const desktopColumnCount = Math.max(desktopImages.length, 1);

  return (
    <section className="relative mx-2 mb-4 min-h-screen overflow-hidden rounded-3xl">
      {imageUrls.length > 0 ? (
        <div className="absolute inset-0 z-0">
          {mobileImage ? (
            <div className="relative h-screen w-full md:hidden">
              <Image
                src={mobileImage}
                alt=""
                fill
                priority
                aria-hidden
                className="pointer-events-none scale-105 object-cover object-center"
                sizes="100vw"
              />
            </div>
          ) : null}

          {desktopImages.length > 0 ? (
            <div
              className="hidden h-screen w-full md:grid"
              style={{
                gridTemplateColumns: `repeat(${desktopColumnCount}, minmax(0, 1fr))`,
              }}
            >
              {desktopImages.map((src, index) => (
                <div key={`${src}-${index}`} className="relative h-screen overflow-hidden">
                  <Image
                    src={src}
                    alt=""
                    fill
                    priority={index === 0}
                    aria-hidden
                    className="pointer-events-none scale-105 object-cover object-center"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-base/70"
      />

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="mb-4 text-3xl font-bold text-brand md:text-4xl">
          A Journey of Joy
        </h1>
        <p className="mx-auto max-w-2xl leading-relaxed text-copy-secondary">
          From first steps to milestone moments — a collection of
          memories that shaped a life full of laughter, love, and
          little adventures worth celebrating.
        </p>
      </div>
    </section>
  );
}