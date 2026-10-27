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
import { useUpdateMyListMutation } from "../services/detailList.api";
import CreatableSelect from "react-select/creatable";

type Props = {
  id: string;
  tags: string[];
};

export default function EditListTagsDialog({ id, tags }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<
    { value: string; label: string }[]
 >([]);
  const [updateMyList, { isLoading }] = useUpdateMyListMutation();

  const handleSave = async () => {
    try {
      await updateMyList({
        id,
        tags: selectedTags.map((tag) => tag.value),
      }).unwrap();

      toast.success("تگ‌ها ویرایش شدند.");
      setOpen(false);
    } catch {
      toast.error("ویرایش تگ‌ها ناموفق بود.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (value) {
          setSelectedTags(
            tags.map((tag) => ({ value: tag, label: tag })),
          );
        }
      }}
    >
      <DialogTrigger>
        <Button variant="ghost" size="icon" aria-label="ویرایش تگ‌ها">
          <Pencil size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش تگ‌ها</DialogTitle>
        </DialogHeader>

        <CreatableSelect
          isMulti
          options={tags.map((tag) => ({ value: tag, label: tag }))}
          value={selectedTags}
          onChange={(options) => setSelectedTags([...options])}
          placeholder="تگ‌ها را انتخاب یا وارد کنید..."
          noOptionsMessage={() => "تگی پیدا نشد"}
          formatCreateLabel={(value) => `افزودن "${value}"`}
        />

        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "در حال ذخیره..." : "ذخیره"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}