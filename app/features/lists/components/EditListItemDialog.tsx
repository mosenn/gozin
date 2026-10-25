"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { EditListItemFormValues, editListItemSchema } from "../schemas/list.schema";
import { useUpdateListItemMutation } from "../services/lists.api";
import { toast } from "react-toastify";


type Props = {
  listId: string;
  itemId: string;
  status: EditListItemFormValues["status"];
  order?: number;
  note?: string | null;
};

function EditListItemDialog({  listId,itemId, status, order, note }: Props) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditListItemFormValues>({
    resolver: zodResolver(editListItemSchema),
    defaultValues: {
      status,
      order,
      note: note ?? "",
    },
  });

  const [updateListItem, { isLoading }]= useUpdateListItemMutation()

  const onSubmit = async (data: EditListItemFormValues) => {
    try {
      const response = await updateListItem({
        listId,
        itemId,
        ...data,
      }).unwrap();

      console.log("Update list item response:", response);

      toast.success("جزئیات فیلم با موفقیت ویرایش شد");
      setOpen(false);
    } catch (error) {
      console.error("Update list item error:", error);
      toast.error("ویرایش جزئیات فیلم ناموفق بود");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) reset({ status, order, note: note ?? "" });
      }}
    >
      <DialogTrigger>
        <Button variant="outline" size="sm">
          <Pencil className="ml-1 size-4" />
          ویرایش جزئیات
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش جزئیات فیلم</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>وضعیت تماشا</label>
            <Select
              value={watch("status") ?? ""}
              onValueChange={(value) =>
                setValue("status", value as EditListItemFormValues["status"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب وضعیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PLANNED">برای تماشا</SelectItem>
                <SelectItem value="WATCHING">در حال تماشا</SelectItem>
                <SelectItem value="COMPLETED">تماشا شده</SelectItem>
                <SelectItem value="DROPPED">رها شده</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
          </div>

          <div>
            <label htmlFor="order">ترتیب در لیست</label>
            <Input
              id="order"
              type="number"
              {...register("order", {
                setValueAs: (value) => value === "" ? undefined : Number(value),
              })}
            />
            {errors.order && <p className="text-sm text-destructive">{errors.order.message}</p>}
          </div>

          <div>
            <label htmlFor="note">یادداشت</label>
            <Textarea id="note" {...register("note")} />
            {errors.note && <p className="text-sm text-destructive">{errors.note.message}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              لغو
            </Button>
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditListItemDialog;
