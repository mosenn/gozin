import { Button } from "@/components/ui/Button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Delete } from "lucide-react"
import { useState } from "react"
import { useDeleteListItemMutation } from "../services/lists.api"
import { toast } from "react-toastify"


function DeleteListItem({ listId, itemId }: { listId: string, itemId: string }) {
    const [open, setOpen] = useState(false)
    const [deleteListItem, { isLoading }] = useDeleteListItemMutation()
    const handeleDelete = async () => {
        try {
            const result = await deleteListItem({ listId, itemId }).unwrap();
            toast.success("فیلم با موفقیت از لیست حذف شد");
            setOpen(false);

        }
        catch { toast.error("خطایی در حذف لیست پیش امد")}
    }

    return (
        <Dialog 
        open={open}
        onOpenChange={(value)=>{
            setOpen(value)
        }}>
            <DialogTrigger>
                <Button className="flex gap-2 bg-red"
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="حذف فیلم"
                >
                    حذف از لیست
                    <Delete size={18} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <p>آیا از حذف فیلم مطمعن هستید؟</p>
                <div className="flex mt-2 justify-between">
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>لغو</Button>
                    <Button onClick={handeleDelete} disabled={isLoading}>بله</Button>
                </div>
            </DialogContent>

        </Dialog>
    )
}

export default DeleteListItem