"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface TimelineEntryValues {
  title: string;
  description: string;
  photoUrl: string;
  sortOrder: number;
}

interface TimelineEntryFormProps {
  initialValues?: Partial<TimelineEntryValues>;
  onSubmit: (values: TimelineEntryValues) => Promise<void>;
  submitLabel?: string;
}

const EMPTY_VALUES: TimelineEntryValues = {
  title: "",
  description: "",
  photoUrl: "",
  sortOrder: 0,
};

export function TimelineEntryForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
}: TimelineEntryFormProps) {
  const [values, setValues] = useState<TimelineEntryValues>({
    ...EMPTY_VALUES,
    ...initialValues,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof TimelineEntryValues>(
    field: K,
    value: TimelineEntryValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(values);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="timeline-title"
          className="text-sm font-medium text-copy-primary"
        >
          Title
        </label>
        <Input
          id="timeline-title"
          className="text-black"
          value={values.title}
          onChange={(event) => updateField("title", event.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="timeline-description"
          className="text-sm font-medium text-copy-primary"
        >
          Description
        </label>
        <Textarea
          id="timeline-description"
          value={values.description}
          onChange={(event) => updateField("description", event.target.value)}
          required
          disabled={loading}
          className="min-h-24 rounded-2xl text-black"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="timeline-photo-url"
          className="text-sm font-medium text-copy-primary"
        >
          Photo URL
        </label>
        <Input
          id="timeline-photo-url"
          type="url"
          value={values.photoUrl}
          className="text-black"
          onChange={(event) => updateField("photoUrl", event.target.value)}
          placeholder="https://"
          required
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="timeline-sort-order"
          className="text-sm font-medium text-copy-primary"
        >
          Sort order
        </label>
        <Input
          id="timeline-sort-order"
          type="number"
          min={0}
          step={1}
          value={values.sortOrder}
          onChange={(event) =>
            updateField("sortOrder", Number(event.target.value))
          }
          required
          className="text-black"
          disabled={loading}
        />
      </div>

      {error ? (
        <p className="text-sm text-state-error" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={loading}>
        {loading ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}