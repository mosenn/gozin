
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
import { Textarea } from "@/components/ui/textarea";
import { useUpdateMyListMutation } from "../services/detailList.api";

type EditListDescriptionDialogProps = {
  id: string;
  description: string;
  onUpdated: () => void;
};

export default function EditListDescriptionDialog({
  id,
  description,
  onUpdated,
}: EditListDescriptionDialogProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(description);
  const [updateMyList, { isLoading }] = useUpdateMyListMutation();

  const handleSave = async () => {
    const newDescription = value.trim();

    if (newDescription === description) {
      setOpen(false);
      return;
    }

    try {
      await updateMyList({
        id,
        description: newDescription,
      }).unwrap();

      toast.success("توضیحات لیست با موفقیت ویرایش شد.");
      onUpdated();
      setOpen(false);
    } catch {
      toast.error("ویرایش توضیحات لیست با خطا مواجه شد.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (nextOpen) {
          setValue(description);
        }
      }}
    >
      <DialogTrigger>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="ویرایش توضیحات"
        >
          <Pencil size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش توضیحات لیست</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="توضیحات لیست را وارد کنید"
            rows={4}
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