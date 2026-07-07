"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Relationship, WishStatus } from "@/lib/generated/prisma/enums";
import { cn } from "@/lib/utils";

export interface AdminWish {
  id: string;
  authorName: string;
  relationship: Relationship;
  message: string;
  photoUrl: string | null;
  videoUrl: string | null;
  status: WishStatus;
  createdAt: string;
}

interface WishModerationCardProps {
  wish: AdminWish;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  FAMILY: "Family",
  FRIEND: "Friend",
  COLLEAGUE: "Colleague",
};

const STATUS_STYLES: Record<WishStatus, string> = {
  PENDING: "bg-subtle text-state-pending border-border-subtle",
  APPROVED: "bg-accent-primary-dim text-state-success border-transparent",
  REJECTED: "bg-state-error/10 text-state-error border-transparent",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function WishModerationCard({
  wish,
  onApprove,
  onReject,
  onDelete,
}: WishModerationCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState<"approve" | "reject" | "delete" | null>(
    null,
  );

  async function handleApprove() {
    setLoading("approve");
    try {
      await onApprove(wish.id);
    } finally {
      setLoading(null);
    }
  }

  async function handleReject() {
    setLoading("reject");
    try {
      await onReject(wish.id);
    } finally {
      setLoading(null);
    }
  }

  async function handleDelete() {
    setLoading("delete");
    try {
      await onDelete(wish.id);
      setDeleteOpen(false);
    } finally {
      setLoading(null);
    }
  }

  return (
    <>
      <Card className="rounded-2xl border-surface-border bg-surface shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="space-y-1">
            <p className="font-semibold text-copy-primary">{wish.authorName}</p>
            <p className="text-sm text-copy-secondary">
              {RELATIONSHIP_LABELS[wish.relationship]}
            </p>
          </div>
          <Badge
            variant="outline"
            className={cn("capitalize", STATUS_STYLES[wish.status])}
          >
            {wish.status.toLowerCase()}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-copy-primary">
            {wish.message}
          </p>

          {wish.photoUrl ? (
            <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl border border-surface-border">
              <Image
                src={wish.photoUrl}
                alt={`Photo from ${wish.authorName}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 320px"
                unoptimized
              />
            </div>
          ) : null}

          {wish.videoUrl ? (
            <a
              href={wish.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline"
            >
              <ExternalLink className="size-4" />
              Video link
            </a>
          ) : null}

          <p className="text-xs text-copy-muted">
            Submitted {formatDate(wish.createdAt)}
          </p>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2 border-t border-surface-border pt-4">
          {wish.status !== "APPROVED" ? (
            <Button
              type="button"
              size="sm"
              onClick={handleApprove}
              disabled={loading !== null}
            >
              {loading === "approve" ? "Approving…" : "Approve"}
            </Button>
          ) : null}

          {wish.status !== "REJECTED" ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReject}
              disabled={loading !== null}
            >
              {loading === "reject" ? "Rejecting…" : "Reject"}
            </Button>
          ) : null}

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            disabled={loading !== null}
            className="ml-auto gap-1.5"
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete wish?</DialogTitle>
            <DialogDescription>
              This permanently removes the wish from {wish.authorName}. This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-t-0 bg-transparent p-0 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={loading === "delete"}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={loading === "delete"}
            >
              {loading === "delete" ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}