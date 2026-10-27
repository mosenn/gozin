"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm, Controller } from "react-hook-form";
import { CreateListFormValues } from "../types/list.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createListSchema } from "../schemas/list.schema";
import CreatableSelect from "react-select/creatable";
import { useCreateListMutation } from "../services/createList";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type TagOption = {
    value: string;
    label: string;
};

const defaultTags: TagOption[] = [
    { value: "Action", label: "Action" },
    { value: "Adventure", label: "Adventure" },
    { value: "Comedy", label: "Comedy" },
    { value: "Drama", label: "Drama" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Horror", label: "Horror" },
    { value: "Romance", label: "Romance" },
    { value: "Sci-Fi", label: "Sci-Fi" },
    { value: "Thriller", label: "Thriller" },
    { value: "Mystery", label: "Mystery" },
    { value: "Animation", label: "Animation" },
    { value: "Anime", label: "Anime" },
    { value: "Movie", label: "Movie" },
    { value: "Series", label: "Series" },
    { value: "Classic", label: "Classic" },
    { value: "Netflix", label: "Netflix" },
    { value: "Marvel", label: "Marvel" },
    { value: "DC", label: "DC" },
    { value: "Christopher Nolan", label: "Christopher Nolan" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
];


export default function CreateListForm() {
    const router = useRouter()
    const { register, handleSubmit, control, formState } = useForm<CreateListFormValues>({
        mode: "onChange",
        resolver: zodResolver(createListSchema)
    })

    const [createList, { isLoading }] = useCreateListMutation();

    const onSubmit = async (data: CreateListFormValues) => {
        try {
            const result = await createList(data).unwrap();
            toast.success("لیست با موفقیت ساخته شد");
            router.push("/dashboard/lists");
        } catch (error) {
            const message =
                (error as { data?: { message?: string } })?.data?.message ??
                "ساخت لیست با خطا مواجه شد";
            toast.error(message);
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <Label htmlFor="title">عنوان</Label>
                <Input id="title"  {...register("title")} />
                {formState.errors.title && (
                    <p className="text-sm text-red-500">
                        {formState.errors.title.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">توضیحات</Label>
                <Input id="description" {...register("description")} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="coverUrl">لینک کاور</Label>
                <Input id="coverUrl" {...register("coverUrl")} />
                {formState.errors.coverUrl && (
                    <p className="text-sm text-red-500">
                        {formState.errors.coverUrl.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="tags">برچسب ها</Label>
                <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <CreatableSelect<TagOption, true>

                            isMulti
                            options={defaultTags}
                            value={(field.value ?? []).map((tag) => ({
                                value: tag,
                                label: tag,
                            }))}
                            onChange={(options) =>
                                field.onChange(options.map((option) => option.value))
                            }
                            placeholder="انتخاب یا ایجاد برچسب..."
                            noOptionsMessage={() => "برچسبی پیدا نشد"}
                            formatCreateLabel={(inputValue) => `ایجاد «${inputValue}»`}
                            isRtl
                        />
                    )}
                />
            </div>

            <Controller
                name="privacy"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center gap-3">
                        <Label htmlFor="privacy">
                            {field.value === "PUBLIC" ? "عمومی" : "خصوصی"}
                        </Label>

                        <Switch
                            dir="ltr"
                            id="privacy"
                            checked={field.value === "PUBLIC"}
                            onCheckedChange={(checked) =>
                                field.onChange(checked ? "PUBLIC" : "PRIVATE")
                            }
                        />
                    </div>
                )}
            />
            <Button type="submit" disabled={!formState.isValid || isLoading}>
                {isLoading ? "در حال ساخت..." : "ساخت لیست"}
            </Button>
        </form>
    );
}