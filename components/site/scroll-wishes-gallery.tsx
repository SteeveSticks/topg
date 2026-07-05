"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowRight, PartyPopper } from "lucide-react";
import slide1 from "@/public/slide1.jpg";
import slide2 from "@/public/slide2.jpg";
import slide3 from "@/public/slide3.webp";
import slide4 from "@/public/slide4.jpg";
import slide5 from "@/public/slide5.jpg";
import slide6 from "@/public/slide6.jpg";
import happinessConfetti1 from "@/public/happiness-confetti1-removebg-preview.png";
import happinessConfetti2 from "@/public/happiness-confetti2-removebg-preview.png";

interface GalleryImage {
  src: string | StaticImageData;
  alt: string;
  rotation: string;
  position: string;
  zIndex: string;
  hatSide: "left" | "right";
}

interface GallerySlide {
  eyebrow: string;
  subtitle: string;
  headlinePrefix: string;
  highlight: string;
  body: string;
  secondaryEyebrow: string;
  secondaryBody: string;
  images: GalleryImage[];
}

const slides: GallerySlide[] = [
  {
    eyebrow: "Create Happiness",
    subtitle:
      "Together with us, we will create unparalleled happiness and unforgettable memories.",
    headlinePrefix: "As a",
    highlight: "Family",
    body: "Here, we will become your delightful family, and we will entertain you just like a family should.",
    secondaryEyebrow: "Bringing Joy",
    secondaryBody:
      "Creating joy with you on your birthday because it is a special day.",
    images: [
      {
        src: slide1,
        alt: "Slide one image",
        rotation: "-rotate-3",
        position: "top-6 left-6 w-[72%]",
        zIndex: "z-10",
        hatSide: "left",
      },
      {
        src: slide2,
        alt: "Slide two image",
        rotation: "rotate-2",
        position: "bottom-10 -right-10 w-[72%]",
        zIndex: "z-0",
        hatSide: "right",
      },
    ],
  },
  {
    eyebrow: "Share Memories",
    subtitle:
      "Every wish, photo, and message becomes part of a story worth revisiting.",
    headlinePrefix: "With",
    highlight: "Friends",
    body: "Your closest friends are here too — sending love, laughter, and a little chaos your way.",
    secondaryEyebrow: "Celebrate Together",
    secondaryBody:
      "Birthdays are better when everyone chips in a memory, a joke, or a heartfelt note.",
    images: [
      {
        src: slide3,
        alt: "Slide three image",
        rotation: "-rotate-2",
        position: "top-8 left-8 w-[72%]",
        zIndex: "z-10",
        hatSide: "left",
      },
      {
        src: slide4,
        alt: "Slide four image",
        rotation: "rotate-3",
        position: "bottom-12 -right-10 w-[72%]",
        zIndex: "z-0",
        hatSide: "right",
      },
    ],
  },
  {
    eyebrow: "Make It Last",
    subtitle:
      "Scroll through the moments that made this year unforgettable.",
    headlinePrefix: "For",
    highlight: "You",
    body: "This page is your keepsake — a living album of everyone who showed up to celebrate you.",
    secondaryEyebrow: "Keep Scrolling",
    secondaryBody:
      "Each image below can be explored on its own — drag the scrollbar to see more.",
    images: [
      {
        src: slide5,
        alt: "Slide five image",
        rotation: "-rotate-3",
        position: "top-6 left-10 w-[74%]",
        zIndex: "z-10",
        hatSide: "left",
      },
      {
        src: slide6,
        alt: "Slide one image",
        rotation: "rotate-2",
        position: "bottom-10 -right-12 w-[74%]",
        zIndex: "z-0",
        hatSide: "right",
      },
    ],
  },
];

function getCenteredMobilePosition(zIndex: string) {
  if (zIndex === "z-10") {
    return "top-8 left-1/2 w-[68%] -translate-x-[58%]";
  }

  return "bottom-10 left-1/2 w-[68%] -translate-x-[32%]";
}

function ScrollableImageCard({
  src,
  alt,
  rotation,
  position,
  zIndex,
  hatSide,
  centered = false,
}: GalleryImage & { centered?: boolean }) {
  const resolvedPosition = centered
    ? getCenteredMobilePosition(zIndex)
    : position;

  return (
    <div className={`absolute ${resolvedPosition} ${zIndex}`}>
      <div className={`relative ${rotation}`}>
        <div className="overflow-hidden rounded-sm border border-surface-border bg-surface shadow-lg aspect-[2/3] w-full">
          <Image
            src={src}
            alt={alt}
            width={600}
            height={900}
            className="w-full h-full object-cover"
          />
        </div>
        <span
          className={`absolute top-3 ${hatSide === "left" ? "left-3" : "right-3"} inline-flex size-9 items-center justify-center rounded-full bg-brand text-white shadow-md`}
          aria-hidden="true"
        >
          <PartyPopper className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
    </div>
  );
}

function SlideText({ slide }: { slide: GallerySlide }) {
  return (
    <div className="flex flex-col justify-start py-10 md:min-h-[70vh] md:justify-center md:py-24">
      <p className="mb-1.5 text-lg font-medium text-copy-faint md:mb-2 md:text-2xl">
        {slide.eyebrow}
      </p>
      <p className="mb-6 max-w-full text-sm leading-relaxed text-copy-muted md:mb-8 md:max-w-md">
        {slide.subtitle}
      </p>

      <h3 className="mb-3 text-2xl font-bold leading-tight text-copy-primary md:mb-4 md:text-4xl">
        {slide.headlinePrefix}{" "}
        <span className="inline-block rotate-2 bg-[#0074FE] px-2 py-0.5 text-white shadow-md md:px-3 md:py-1">
          {slide.highlight}
        </span>
      </h3>

      <p className="mb-6 max-w-full text-sm leading-relaxed text-copy-secondary md:mb-8 md:max-w-md">
        {slide.body}
      </p>

      <button
        type="button"
        className="mb-10 inline-flex w-fit items-center gap-2 border border-copy-primary px-5 py-2 text-sm font-semibold text-copy-primary transition-colors hover:bg-subtle md:mb-16 md:px-6 md:py-2.5"
      >
        MEMORY LANE
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </button>

      <div className="border-t border-surface-border pt-6 md:pt-10">
        <p className="mb-1.5 text-sm font-medium text-copy-faint md:mb-2">
          {slide.secondaryEyebrow}
        </p>
        <p className="max-w-full text-sm leading-relaxed text-copy-muted md:max-w-md">
          {slide.secondaryBody}
        </p>
      </div>
    </div>
  );
}

export function ScrollWishesGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    slideRefs.current.forEach((node, index) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.55, rootMargin: "-10% 0px -10% 0px" },
      );

      observer.observe(node);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="relative px-1 sm:px-6 pb-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-10 md:gap-0">
          {slides.map((slide, index) => (
            <div
              key={slide.eyebrow}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
            >
              <SlideText slide={slide} />
            </div>
          ))}
        </div>

        {/* <div className="relative hidden md:block">
          <div className="sticky top-24 h-[calc(100vh-6rem)]">
            {slides.map((slide, index) => (
              <div
                key={slide.eyebrow}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === activeIndex
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-6 opacity-0"
                }`}
              >
                <div className="relative h-full w-full">
                  {slide.images.map((image, imageIndex) => (
                    <ScrollableImageCard
                      key={`${slide.eyebrow}-${imageIndex}`}
                      {...image}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="flex flex-col gap-10 md:hidden">
          {slides.map((slide) => (
            <div
              key={slide.eyebrow}
              className="relative mx-auto h-[800px] w-full max-w-[800px]"
            >
              {slide.images.map((image, imageIndex) => (
                <ScrollableImageCard
                  key={`${slide.eyebrow}-${imageIndex}`}
                  {...image}
                  centered
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 pt-16 md:pt-24">
        <div className="flex items-center justify-center gap-4">
          <Image
            src={happinessConfetti2}
            alt="confetti"
            className="hidden md:block h-12 relative -top-8 right-6"
          />
          <p className="text-center text-2xl md:text-4xl font-extrabold">
            <span className="text-[#FE029B]">Spreading</span>
            <span className="text-[#0C75F2] ml-2">joy</span>
            <span className="text-black ml-2">and</span>
            <span className="text-[#F66D08] ml-2">happiness.</span>
          </p>
          <Image
            src={happinessConfetti1}
            alt="confetti"
            className="hidden md:block h-16 relative top-10 left-0"
          />
        </div>
        <button
          type="button"
          className="mb-16 inline-flex w-fit items-center gap-2 border border-copy-primary px-6 py-2.5 text-sm font-semibold text-copy-primary transition-colors hover:bg-subtle"
        >
          MEMORY LANE
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
