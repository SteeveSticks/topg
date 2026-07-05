import Image from "next/image";
import { Cake, Sparkles } from "lucide-react";

import { CountdownBlock } from "@/components/site/countdown-block";
import profilePic from "@/public/profile_pic.jpg";
import confetti1 from "@/public/confitti1-removebg-preview.png";
import confetti2 from "@/public/conftti2-removebg-preview.png";
interface HeroSectionProps {
  honoreeName: string;
  photoUrl: string;
  subtitle: string;
  countdownTarget: string;
}

export function HeroSection({
  honoreeName,
  // photoUrl,
  subtitle,
  countdownTarget,
}: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center px-6 pt-12 pb-16 text-center">
      <div className="relative mb-6">
        <div className="absolute -inset-2 rounded-full bg-accent-decorative/40 blur-sm" />
        <div className="relative size-40 overflow-hidden rounded-full ring-4 ring-brand md:size-48">
          <Image
            src={profilePic}
            alt={honoreeName}
            fill
            className="object-cover"
            // priority
          />
        </div>
        <span className="absolute -bottom-1 -left-1 inline-flex size-9 items-center justify-center rounded-full bg-brand text-white shadow-md">
          <Cake className="h-4 w-4" strokeWidth={2} />
        </span>
        <span className="absolute -top-1 -right-1 inline-flex size-9 items-center justify-center rounded-full bg-brand text-white shadow-md">
          <Sparkles className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto h-full max-w-6xl"
      >
        <div className="absolute left-8 top-12 h-12 w-12 md:h-14 md:w-14">
          <Image
            src={confetti1}
            alt="confetti"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute left-1/4 top-24 h-10 w-10 md:h-12 md:w-12">
          <Image
            src={confetti2}
            alt="confetti"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute right-10 top-10 h-14 w-14 md:h-16 md:w-16">
          <Image
            src={confetti1}
            alt="confetti"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute right-16 top-36 h-10 w-10 md:h-12 md:w-12">
          <Image
            src={confetti2}
            alt="confetti"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute left-10 bottom-24 h-10 w-10 md:h-12 md:w-12">
          <Image
            src={confetti1}
            alt="confetti"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute right-1/3 bottom-16 h-12 w-12 md:h-14 md:w-14">
          <Image
            src={confetti2}
            alt="confetti"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute left-1/2 bottom-10 h-14 w-14 md:h-16 md:w-16">
          <Image
            src={confetti1}
            alt="confetti"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <h1 className="mb-3 text-3xl font-bold text-copy-primary md:text-4xl">
        Happy Birthday,{" "}
        <span className="relative ml-1 inline-block">
          <span className="absolute inset-0 -top-1 -bottom-1 rotate-[-6deg] bg-[#FF6B00]" />
          <span className="relative px-2 text-brand">
            {honoreeName}
          </span>
        </span>
        !
      </h1>

      <p className="mb-8 max-w-xl text-base leading-relaxed text-copy-secondary">
        {subtitle}
      </p>

      <CountdownBlock targetDate={countdownTarget} />
    </section>
  );
}
