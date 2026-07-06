export function MemoryLaneHero() {
  return (
    <section className="relative mx-6 mb-4 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none block"
      >
        <source src="/video/love-video.mp4" type="video/mp4" />
      </video>

      <div aria-hidden="true" className="absolute inset-0 bg-base/70" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 text-3xl font-bold text-brand md:text-4xl">
          A Journey of Joy
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-copy-secondary">
          From first steps to milestone moments — a collection of memories that
          shaped a life full of laughter, love, and little adventures worth
          celebrating.
        </p>
      </div>
    </section>
  );
}