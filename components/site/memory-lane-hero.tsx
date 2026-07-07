export function MemoryLaneHero() {
  const videos = [
    "/video/love-video.mp4",
    "/video/love-video2.mp4",
    "/video/love-video3.mp4",
    "/video/love-video4.mp4",
  ];

  return (
    <section className="relative mx-2 mb-4 min-h-screen overflow-hidden rounded-3xl">
      <div className="absolute inset-0 z-0">
        <div className="h-screen w-full md:hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            className="pointer-events-none h-full w-full scale-105 object-cover object-center"
          >
            <source src={videos[0]} type="video/mp4" />
          </video>
        </div>

        <div className="hidden h-screen w-full md:grid md:grid-cols-4">
          {videos.map((src) => (
            <div key={src} className="h-screen overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
                className="pointer-events-none h-full w-full scale-105 object-cover object-center"
              >
                <source src={src} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      </div>

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
