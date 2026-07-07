"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";

import {
  TimelineEntryForm,
  type TimelineEntryValues,
} from "@/components/admin/timeline-entry-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  sortOrder: number;
}

export default function AdminTimelinePage() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimelineEntry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    setError("");

    const response = await fetch("/api/timeline");

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      throw new Error(data?.error ?? "Failed to load timeline entries");
    }

    const data = (await response.json()) as TimelineEntry[];
    setEntries(data);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadEntries() {
      setLoading(true);

      try {
        await fetchEntries();
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load timeline entries",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadEntries();

    return () => {
      cancelled = true;
    };
  }, [fetchEntries]);

  async function createEntry(values: TimelineEntryValues) {
    const response = await fetch("/api/admin/timeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      throw new Error(data?.error ?? "Failed to create entry");
    }

    setAddOpen(false);
    await fetchEntries();
  }

  async function updateEntry(id: string, values: TimelineEntryValues) {
    const response = await fetch(`/api/admin/timeline/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      throw new Error(data?.error ?? "Failed to update entry");
    }

    setEditingEntry(null);
    await fetchEntries();
  }

  async function deleteEntry(id: string) {
    const response = await fetch(`/api/admin/timeline/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      throw new Error(data?.error ?? "Failed to delete entry");
    }

    setDeletingId(null);
    await fetchEntries();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-copy-primary">
            Timeline editor
          </h1>
          <p className="mt-1 text-sm text-copy-secondary">
            Manage Memory Lane entries shown on the public site.
          </p>
        </div>

        <Button type="button" onClick={() => setAddOpen(true)} className="gap-1.5">
          <Plus className="size-4" />
          Add Entry
        </Button>
      </div>

      {error ? (
        <p className="text-sm text-state-error" role="alert">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-copy-secondary">Loading entries…</p>
      ) : entries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-surface-border bg-surface px-6 py-10 text-center text-sm text-copy-secondary">
          No timeline entries yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {entries.map((entry) => (
            <Card
              key={entry.id}
              className="rounded-2xl border-surface-border bg-surface shadow-sm"
            >
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div>
                  <h2 className="font-semibold text-copy-primary">
                    {entry.title}
                  </h2>
                  <p className="text-xs text-copy-muted">
                    Sort order: {entry.sortOrder}
                  </p>
                </div>
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-surface-border">
                  <Image
                    src={entry.photoUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized
                  />
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-relaxed text-copy-secondary">
                  {entry.description}
                </p>
              </CardContent>

              <CardFooter className="flex gap-2 border-t border-surface-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setEditingEntry(entry)}
                >
                  <Pencil className="size-4" />
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setDeletingId(entry.id)}
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="rounded-3xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add timeline entry</DialogTitle>
          </DialogHeader>
          <TimelineEntryForm
            submitLabel="Create entry"
            onSubmit={createEntry}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editingEntry !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditingEntry(null);
          }
        }}
      >
        <DialogContent className="rounded-3xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit timeline entry</DialogTitle>
          </DialogHeader>
          {editingEntry ? (
            <TimelineEntryForm
              key={editingEntry.id}
              initialValues={editingEntry}
              submitLabel="Save changes"
              onSubmit={(values) => updateEntry(editingEntry.id, values)}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog
        open={deletingId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingId(null);
          }
        }}
      >
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete timeline entry?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-copy-secondary">
            This removes the entry from Memory Lane. This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeletingId(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (deletingId) {
                  void deleteEntry(deletingId);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}