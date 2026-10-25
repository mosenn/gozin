
"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
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
import { toast } from "react-toastify";

type EditListTitleDialogProps = {
  id: string;
  title: string;
  onUpdated: () => void;
};

export default function EditListTitleDialog({
  id,
  title,
  onUpdated,
}: EditListTitleDialogProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(title);
  const [error, setError] = useState("");
  const [updateMyList, { isLoading }] = useUpdateMyListMutation();

  const handleSave = async () => {
    const newTitle = value.trim();

    if (!newTitle) {
      setError("عنوان لیست نمی‌تواند خالی باشد.");
      return;
    }

    if (newTitle === title) {
      setOpen(false);
      return;
    }

    try {
      setError("");

      await updateMyList({
        id,
        title: newTitle,
      }).unwrap();
      toast.success("عنوان لیست با موفقیت ویرایش شد.");
      onUpdated();
      setOpen(false);
    } catch {
       toast.error("ویرایش عنوان لیست با خطا مواجه شد.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (nextOpen) {
          setValue(title);
          setError("");
        }
      }}
    >
      <DialogTrigger>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="ویرایش عنوان"
        >
          <Pencil size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش عنوان لیست</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="عنوان لیست"
          />

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

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
              disabled={isLoading || !value.trim()}
            >
              {isLoading ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}