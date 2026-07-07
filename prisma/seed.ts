import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.wish.deleteMany();
  await prisma.timelineEntry.deleteMany();
  await prisma.site.deleteMany();

  await prisma.site.create({
    data: {
      honoreeName: "David",
      tagline: "Birthday Wishes",
      heroPhotoUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      countdownTarget: new Date("2026-07-08T17:00:00"),
      pageCopy:
        "Let's celebrate another trip around the sun. We've gathered wishes, memories, and love from everyone who thinks you're amazing.",
    },
  });

  await prisma.wish.createMany({
    data: [
      {
        authorName: "Mom",
        relationship: "FAMILY",
        message:
          "Happy Birthday! I am so incredibly proud of everything you've accomplished this year. You inspire me every day with your dedication and kind heart.",
        status: "APPROVED",
        createdAt: new Date("2026-07-07T10:00:00"),
      },
      {
        authorName: "Bella",
        relationship: "FRIEND",
        message:
          "To many more years of questionable decisions and unforgettable memories! Have a blast today! 🎉",
        photoUrl:
          "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
        status: "APPROVED",
        createdAt: new Date("2026-07-08T09:00:00"),
      },
      {
        authorName: "Codemonk",
        relationship: "COLLEAGUE",
        message:
          "Wishing you the happiest of birthdays! May this year bring you as much joy and laughter as you bring to everyone around you.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        status: "APPROVED",
        createdAt: new Date("2026-07-06T14:00:00"),
      },
      {
        authorName: "Stephen",
        relationship: "FRIEND",
        message:
          "Looking forward to the party tonight! Save a slice of cake for me!",
        status: "PENDING",
        createdAt: new Date("2026-07-08T12:00:00"),
      },
    ],
  });

  await prisma.timelineEntry.createMany({
    data: [
      {
        title: "The Early Days",
        description:
          "Before the big dreams and bold adventures, there were quiet mornings, curious eyes, and the kind of wonder that turns an ordinary afternoon into something magical.",
        photoUrl:
          "https://images.unsplash.com/photo-1503454537845-cef9b9b1c6a?w=800&h=600&fit=crop",
        sortOrder: 0,
      },
      {
        title: "Finding Passions",
        description:
          "Somewhere between school days and late-night projects, hobbies became callings — music, sports, art, or whatever lit that unmistakable spark of joy.",
        photoUrl:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
        sortOrder: 1,
      },
      {
        title: "Milestone Celebrations",
        description:
          "Graduations, reunions, and birthdays that brought everyone together — each one a reminder of how far the journey has come and how many people are cheering along the way.",
        photoUrl:
          "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
        sortOrder: 2,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });