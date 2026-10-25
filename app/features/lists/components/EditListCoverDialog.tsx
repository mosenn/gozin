"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUpdateMyListMutation } from "../services/detailList.api";

type EditListCoverDialogProps = {
  id: string;
  coverUrl: string;
};

export default function EditListCoverDialog({
  id,
  coverUrl,
}: EditListCoverDialogProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(coverUrl);
  const [updateMyList, { isLoading }] = useUpdateMyListMutation();

  const handleSave = async () => {
    const newCoverUrl = value.trim();

    if (newCoverUrl === coverUrl) {
      setOpen(false);
      return;
    }

    if (newCoverUrl) {
      try {
        new URL(newCoverUrl);
      } catch {
        toast.error("آدرس تصویر معتبر نیست.");
        return;
      }
    }

    try {
      await updateMyList({
        id,
        coverUrl: newCoverUrl,
      }).unwrap();

      toast.success("کاور لیست با موفقیت ویرایش شد.");
      setOpen(false);
    } catch {
      toast.error("ویرایش کاور لیست با خطا مواجه شد.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (nextOpen) {
          setValue(coverUrl);
        }
      }}
    >
      <DialogTrigger>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="ویرایش کاور"
        >
          <Pencil size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش کاور لیست</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="url"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="آدرس تصویر را وارد کنید"
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              لغو
            </Button>

            <Button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}