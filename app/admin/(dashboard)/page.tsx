"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  WishModerationCard,
  type AdminWish,
} from "@/components/admin/wish-moderation-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { WishStatus } from "@/lib/generated/prisma/enums";

type StatusTab = "PENDING" | "APPROVED" | "REJECTED";

const STATUS_TABS: { value: StatusTab; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export default function AdminDashboardPage() {
  const [wishes, setWishes] = useState<AdminWish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<StatusTab>("PENDING");

  const fetchWishes = useCallback(async () => {
    setError("");

    const response = await fetch("/api/admin/wishes");

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      throw new Error(data?.error ?? "Failed to load wishes");
    }

    const data = (await response.json()) as AdminWish[];
    setWishes(data);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadWishes() {
      setLoading(true);

      try {
        await fetchWishes();
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load wishes",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadWishes();

    return () => {
      cancelled = true;
    };
  }, [fetchWishes]);

  const wishesByStatus = useMemo(() => {
    return STATUS_TABS.reduce(
      (groups, tab) => {
        groups[tab.value] = wishes.filter((wish) => wish.status === tab.value);
        return groups;
      },
      {} as Record<StatusTab, AdminWish[]>,
    );
  }, [wishes]);

  async function updateStatus(id: string, status: WishStatus) {
    const response = await fetch(`/api/admin/wishes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      throw new Error(data?.error ?? "Failed to update wish");
    }

    await fetchWishes();
  }

  async function deleteWish(id: string) {
    const response = await fetch(`/api/admin/wishes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      throw new Error(data?.error ?? "Failed to delete wish");
    }

    await fetchWishes();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-copy-primary">
          Wish moderation
        </h1>
        <p className="mt-1 text-sm text-copy-secondary">
          Review, approve, or reject submitted birthday wishes.
        </p>
      </div>

      {error ? (
        <p className="text-sm text-state-error" role="alert">
          {error}
        </p>
      ) : null}

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as StatusTab)}
      >
        <TabsList className="bg-subtle">
          {STATUS_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
              <span className="ml-1 text-copy-muted">
                ({wishesByStatus[tab.value].length})
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {STATUS_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {loading ? (
              <p className="text-sm text-copy-secondary">Loading wishes…</p>
            ) : wishesByStatus[tab.value].length === 0 ? (
              <p className="rounded-2xl border border-dashed border-surface-border bg-surface px-6 py-10 text-center text-sm text-copy-secondary">
                No {tab.label.toLowerCase()} wishes.
              </p>
            ) : (
              <div className="grid gap-4">
                {wishesByStatus[tab.value].map((wish) => (
                  <WishModerationCard
                    key={wish.id}
                    wish={wish}
                    onApprove={(id) => updateStatus(id, "APPROVED")}
                    onReject={(id) => updateStatus(id, "REJECTED")}
                    onDelete={deleteWish}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}