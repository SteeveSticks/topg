"use client";

import { useState } from "react";
import { ChevronRight, Link, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  RelationshipToggle,
  type Relationship,
} from "@/components/site/relationship-toggle";
import { UploadDropzone } from "@/components/site/upload-dropzone";

const relationshipToApi: Record<Relationship, "FAMILY" | "FRIEND" | "COLLEAGUE"> =
  {
    family: "FAMILY",
    friend: "FRIEND",
    colleague: "COLLEAGUE",
  };

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function AddWishForm() {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState<Relationship>("friend");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<File | undefined>();
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasPhoto = Boolean(photo);
  const hasVideo = videoUrl.trim().length > 0;
  const canSubmit =
    name.trim().length > 0 && message.trim().length > 0 && status !== "submitting";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      let photoUrl: string | undefined;

      if (photo) {
        const formData = new FormData();
        formData.append("file", photo);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const uploadError = (await uploadResponse.json()) as { error?: string };
          throw new Error(uploadError.error ?? "Failed to upload photo");
        }

        const uploadData = (await uploadResponse.json()) as { url: string };
        photoUrl = uploadData.url;
      }

      const wishResponse = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: name.trim(),
          relationship: relationshipToApi[relationship],
          message: message.trim(),
          photoUrl,
          videoUrl: videoUrl.trim() || undefined,
        }),
      });

      if (!wishResponse.ok) {
        const wishError = (await wishResponse.json()) as { error?: string };
        throw new Error(wishError.error ?? "Failed to submit wish");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl bg-surface p-6 text-center shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-brand sm:text-3xl">
          Wish Submitted!
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-copy-secondary">
          Thank you for sharing your wish. It has been received and will appear
          publicly once it has been approved.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-surface p-6 shadow-sm sm:p-6"
    >
      <h1 className="text-2xl font-bold text-brand sm:text-3xl">
        Share Your Wish
      </h1>
      <p className="mt-2 text-sm text-copy-secondary">
        Send a heartfelt message, photo, or video to celebrate their special
        day.
      </p>

      {errorMessage ? (
        <p className="mt-4 rounded-2xl border border-state-error/30 bg-state-error/5 px-4 py-3 text-sm text-state-error">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-8 space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="wish-name"
            className="text-sm font-medium text-copy-primary"
          >
            Your Name
          </label>
          <div className="relative">
            <User
              className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-copy-muted"
              strokeWidth={2}
            />
            <Input
              id="wish-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-11 pl-11 text-black"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-copy-primary">
            Relationship
          </span>
          <RelationshipToggle
            value={relationship}
            onChange={setRelationship}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="wish-message"
            className="text-sm font-medium text-copy-primary"
          >
            Your Message
          </label>
          <Textarea
            id="wish-message"
            placeholder="Write your birthday wish..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-32 text-black"
            required
          />
        </div>

        <div
          className={cn(
            "space-y-2 transition-opacity",
            hasVideo && "opacity-50",
          )}
        >
          <span className="text-sm font-medium text-copy-primary">
            Add a Photo
          </span>
          <UploadDropzone
            onFileSelect={(file) => {
              setPhoto(file);
              setVideoUrl("");
            }}
            disabled={hasVideo}
          />
          {photo ? (
            <p className="text-xs text-copy-secondary">
              Selected: {photo.name}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-surface-border" />
          <span className="text-xs font-semibold tracking-wide text-copy-muted">
            OR LINK A VIDEO
          </span>
          <div className="h-px flex-1 bg-surface-border" />
        </div>

        <div
          className={cn(
            "space-y-2 transition-opacity",
            hasPhoto && "opacity-50",
          )}
        >
          <label
            htmlFor="wish-video-url"
            className="text-sm font-medium text-copy-primary"
          >
            Video URL
          </label>
          <div className="relative">
            <Link
              className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-copy-muted"
              strokeWidth={2}
            />
            <Input
              id="wish-video-url"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(event) => {
                setVideoUrl(event.target.value);
                if (event.target.value.trim()) setPhoto(undefined);
              }}
              className="h-11 pl-11 text-black"
              disabled={hasPhoto}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Posting..." : "Post Wish"}
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <p className="text-center text-xs text-copy-muted">
          Your wish will be reviewed before it appears publicly.
        </p>
      </div>
    </form>
  );
}