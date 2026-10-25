
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Link as LinkIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateShareLinkMutation } from "../services/sharelink.api";
import { ApiError } from "@/type/api.types";



type Props = {
  listId: string;
};

export default function CreateShareLinkDialog({
  listId,
}: Props) {
  const [open, setOpen] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");

  const [createShareLink, { isLoading }] = useCreateShareLinkMutation();

  const handleCreateLink = async () => {
    if (!expiresAt) {
      toast.error("تاریخ انقضا را انتخاب کنید.");
      return;
    }

    try {
      await createShareLink({
        id: listId,
        expiresAt: new Date(
          `${expiresAt}T23:59:59.999Z`
        ).toISOString(),
      }).unwrap();

      toast.success("لینک اشتراک‌گذاری ساخته شد.");
      setOpen(false);
      setExpiresAt("");
    } catch (error) {
      const errorApi = error as ApiError;
      toast.error(errorApi.data.message)
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          <LinkIcon size={16} />
          ساخت لینک اشتراک‌گذاری
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ساخت لینک اشتراک‌گذاری
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="share-expiry">
              تاریخ انقضای لینک
            </label>

            <input
              id="share-expiry"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full rounded-md border p-2"
            />
          </div>

          <Button
            className="w-full"
            onClick={handleCreateLink}
            disabled={isLoading || !expiresAt}
          >
            {isLoading ? "در حال ساخت..." : "ساخت لینک"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
