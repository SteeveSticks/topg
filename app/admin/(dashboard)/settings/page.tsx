"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface SiteSettings {
  honoreeName: string;
  tagline: string;
  heroPhotoUrl: string;
  countdownTarget: string;
  pageCopy: string;
}

function toDatetimeLocalValue(iso: string) {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function AdminSettingsPage() {
  const [values, setValues] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadSite() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/site");

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(data?.error ?? "Failed to load site settings");
        }

        const data = (await response.json()) as SiteSettings;

        if (!cancelled) {
          setValues(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load site settings",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSite();

    return () => {
      cancelled = true;
    };
  }, []);

  function updateField<K extends keyof SiteSettings>(
    field: K,
    value: SiteSettings[K],
  ) {
    setValues((current) => (current ? { ...current, [field]: value } : current));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values) {
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/site", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          honoreeName: values.honoreeName,
          tagline: values.tagline,
          heroPhotoUrl: values.heroPhotoUrl,
          countdownTarget: new Date(values.countdownTarget).toISOString(),
          pageCopy: values.pageCopy,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Failed to save settings");
      }

      const data = (await response.json()) as SiteSettings;
      setValues(data);
      setSuccess("Settings saved.");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Failed to save settings",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-copy-primary">
          Site settings
        </h1>
        <p className="mt-1 text-sm text-copy-secondary">
          Update hero copy, countdown target, and page content.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-copy-secondary">Loading settings…</p>
      ) : values ? (
        <form
          className="max-w-xl space-y-4 rounded-2xl border border-surface-border bg-surface p-6 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="honoree-name"
              className="text-sm font-medium text-copy-primary"
            >
              Honoree name
            </label>
            <Input
              id="honoree-name"
              value={values.honoreeName}
              onChange={(event) =>
                updateField("honoreeName", event.target.value)
              }
              required
              disabled={saving}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="tagline"
              className="text-sm font-medium text-copy-primary"
            >
              Tagline
            </label>
            <Input
              id="tagline"
              value={values.tagline}
              onChange={(event) => updateField("tagline", event.target.value)}
              required
              disabled={saving}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="hero-photo-url"
              className="text-sm font-medium text-copy-primary"
            >
              Hero photo URL
            </label>
            <Input
              id="hero-photo-url"
              type="url"
              value={values.heroPhotoUrl}
              onChange={(event) =>
                updateField("heroPhotoUrl", event.target.value)
              }
              placeholder="https://"
              required
              disabled={saving}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="countdown-target"
              className="text-sm font-medium text-copy-primary"
            >
              Countdown target
            </label>
            <Input
              id="countdown-target"
              type="datetime-local"
              value={toDatetimeLocalValue(values.countdownTarget)}
              onChange={(event) =>
                updateField("countdownTarget", event.target.value)
              }
              required
              disabled={saving}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="page-copy"
              className="text-sm font-medium text-copy-primary"
            >
              Page copy
            </label>
            <Textarea
              id="page-copy"
              value={values.pageCopy}
              onChange={(event) => updateField("pageCopy", event.target.value)}
              required
              disabled={saving}
              className="min-h-32 rounded-2xl"
            />
          </div>

          {error ? (
            <p className="text-sm text-state-error" role="alert">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="text-sm text-state-success" role="status">
              {success}
            </p>
          ) : null}

          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save settings"}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-state-error" role="alert">
          {error || "Site settings unavailable."}
        </p>
      )}
    </div>
  );
}