"use client";

import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/Button";
import { useDeleteShareLinkMutation } from "../services/sharelink.api";


type Props = {
  id: string;
};

export default function DeleteShareLink({ id }: Props) {
  const [deleteShareLink, { isLoading }] =
    useDeleteShareLinkMutation();

  const handleDelete = async () => {
    try {
      await deleteShareLink(id).unwrap();
      toast.success("لینک اشتراک‌گذاری حذف شد.");
    } catch {
      toast.error("حذف لینک ناموفق بود.");
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isLoading}
    >
      <Trash2 size={16} />
      {isLoading ? "در حال حذف..." : "حذف لینک"}
    </Button>
  );
}