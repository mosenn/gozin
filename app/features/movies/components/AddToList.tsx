"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useAddToListMutation,
  useLazyGetMyListsQuery,
} from "@/features/lists/services/lists.api";
import { Input } from "@/components/ui/Input";
import { toast } from "react-toastify";

type Props = {
  movieId: string;
};

function AddToList({ movieId }: Props) {
  const [getMyLists, { data, isLoading }] = useLazyGetMyListsQuery();
  const [addToList, { isLoading: isAdding }] = useAddToListMutation();

  const [open, setOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("");
  const [order, setOrder] = useState(1);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("WATCHED");

  const handleOpen = async () => {
    const result = await getMyLists();

    if (result.error) {
      toast.error("لطفاً وارد حساب کاربری خود شوید");
      return;
    }

    setOpen(true);
  };

  const handleAdd = async () => {
    if (!selectedList) return;

    try {
     const result = await addToList({
        listId: selectedList,
        titleId: movieId,
        order,
        note,
        status,
      }).unwrap();
      console.log("ADD TO LIST RESPONSE:", result);

      toast.success("فیلم با موفقیت به لیست اضافه شد");
      setOpen(false);
    } catch (error) {
      const apiError = error as {
        data?: {
          message?: string;
        };
      };

      toast.error(apiError.data?.message || "خطایی رخ داد");
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>
        اضافه به لیست‌ها
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>اضافه کردن به لیست</DialogTitle>
          </DialogHeader>

          <div className="max-h-[50vh] space-y-4 overflow-y-auto pr-2">
            <p className="text-sm text-muted-foreground">
              یک لیست را انتخاب کنید
            </p>

            {isLoading ? (
              <p className="text-sm">
                در حال دریافت لیست‌ها...
              </p>
            ) : data?.items.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                لیستی وجود ندارد
              </p>
            ) : (
              <div className="space-y-2">
                {data?.items.map((list) => (
                  <button
                    key={list.id}
                    type="button"
                    onClick={() => setSelectedList(list.id)}
                    className={`w-full rounded-lg border p-3 text-right transition ${
                      selectedList === list.id
                        ? "border-primary bg-primary/10"
                        : "hover:bg-muted"
                    }`}
                  >
                    <p className="font-medium">
                      {list.title}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {list.description}
                    </p>
                  </button>
                ))}
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium">
                ترتیب
              </label>

              <Input
                type="number"
                min={1}
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full rounded-md border bg-background px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                یادداشت
              </label>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="یادداشت خود را بنویسید..."
                className="min-h-24 w-full rounded-md border bg-background px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                وضعیت
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2"
              >
                <option value="WATCHED">WATCHED</option>
              </select>
            </div>
          </div>

          <Button
            onClick={handleAdd}
            disabled={!selectedList || isAdding}
          >
            {isAdding ? "در حال افزودن..." : "افزودن"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddToList;