
"use client";

import { Copy, Share2, Link as LinkIcon } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button";
import DeleteShareLink from './DeleteShareLink';

type Props = {
  listId: string;
  shareSlug: string;
  shareExpiry: string | null;
};

export default function ShareLink({
  listId,
  shareSlug,
  shareExpiry,
}: Props) {
  const link = `${window.location.origin}/share/${listId}/${shareSlug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("لینک کپی شد.");
    } catch {
      toast.error("کپی لینک ناموفق بود.");
    }
  };

  const handleShare = async () => {
    if (!navigator.share) {
      await handleCopy();
      return;
    }

    try {
      await navigator.share({
        title: "اشتراک‌گذاری لیست",
        url: link,
      });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast.error("اشتراک‌گذاری ناموفق بود.");
      }
    }
  };

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <LinkIcon size={18} />
        <span className="font-medium">لینک اشتراک‌گذاری</span>
      </div>

      <p dir="ltr" className="break-all text-sm text-muted-foreground">
        {link}
      </p>

      {shareExpiry && (
        <p className="text-sm text-muted-foreground">
          تاریخ انقضا:{" "}
          {new Date(shareExpiry).toLocaleDateString("fa-IR")}
        </p>
      )}

      <div className="flex gap-2">
        <DeleteShareLink id={listId} />
        <Button variant="outline" onClick={handleCopy}>
          <Copy size={16} />
          کپی لینک
        </Button>

        <Button variant="outline" onClick={handleShare}>
          <Share2 size={16} />
          اشتراک‌گذاری
        </Button>
      </div>
    </div>
  );
}
