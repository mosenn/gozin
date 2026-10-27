import { Button } from "@/components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useUpdateMyListMutation } from "../services/detailList.api";
import { toast } from "react-toastify";


function EditPrivateDialog({ id, privacy }: { id: string, privacy: string }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(privacy);
    const [updateMyList, { isLoading }] = useUpdateMyListMutation();
    
    const handleSave = async()=>{
        if(value === privacy){
            setOpen(false)
            return
        }

        try{
            await updateMyList({
                id,
                privacy:value
            }).unwrap()
            toast.success(" حریم با موفقیت ویرایش شد.");
            setOpen(false)
        }
        catch{
            toast.error("ویرایش حریم با خطا مواجه شد.");
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);

                if (nextOpen) {
                    setValue(privacy);
                }
            }}>

            <DialogTrigger>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="ویرایش  حریم خصوصی"
                >
                    <Pencil size={18} />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>تغیر حریم خصوصی</DialogTitle>
                </DialogHeader>

                <Select value={value} onValueChange={(newValue) => setValue(newValue!)}>
                    <SelectTrigger>
                        <SelectValue placeholder="انتخاب حریم خصوصی" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="PUBLIC">عمومی</SelectItem>
                        <SelectItem value="MEMBERS_ONLY">فقط اعضا</SelectItem>
                        <SelectItem value="PRIVATE">خصوصی</SelectItem>
                        <SelectItem value="LINK_ONLY">فقط با لینک</SelectItem>
                        
                    </SelectContent>
                </Select>
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
            </DialogContent>



        </Dialog>
    )
}

export default EditPrivateDialog