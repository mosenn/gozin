"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetMyListsQuery,
  useMoveListItemMutation,
} from "../services/lists.api";
import { ApiError } from "@/type/api.types";


type Props = {
  listId: string;
  itemId: string;
  order: number;
};

export default function MoveListItemDialog({
  listId,
  itemId,
  order,
}: Props) {
  const [open, setOpen] = useState(false);
  const [targetListId, setTargetListId] = useState("");

  const { data, isLoading: isListsLoading } = useGetMyListsQuery();
  const [moveListItem, { isLoading }] = useMoveListItemMutation();

  const targetLists =
    data?.items.filter((list) => list.id !== listId) ?? [];

  const handleMove = async () => {
    if (!targetListId) {
      toast.error("لطفاً لیست مقصد را انتخاب کنید.");
      return;
    }

    try {
      await moveListItem({
        listId,
        itemId,
        targetListId,
        order,
      }).unwrap();

      toast.success("فیلم با موفقیت منتقل شد.");
      setOpen(false);
      setTargetListId("");
    } catch(error) {
        const apiError = error as ApiError;
        toast.error(apiError.data.message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setTargetListId("");
      }}
    >
      <DialogTrigger>
        <Button variant="outline" size="sm">
          انتقال به لیست دیگر
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>انتقال فیلم به لیست دیگر</DialogTitle>
        </DialogHeader>

        {isListsLoading ? (
          <p>در حال دریافت لیست‌ها...</p>
        ) : targetLists.length === 0 ? (
          <p>لیست دیگری برای انتقال وجود ندارد.</p>
        ) : (
          <>
            <Select
              value={targetListId}
              onValueChange={(value)=>setTargetListId(value??"")}
            >
              <SelectTrigger>
                <SelectValue placeholder="لیست مقصد را انتخاب کنید" />
              </SelectTrigger>

              <SelectContent>
                {targetLists.map((list) => (
                  <SelectItem key={list.id} value={list.id}>
                    {list.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleMove} disabled={isLoading}>
              {isLoading ? "در حال انتقال..." : "انتقال فیلم"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}