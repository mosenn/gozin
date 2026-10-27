"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useLazyGetMyListByIdQuery } from "../services/detailList.api";
import EditListTitleDialog from "./EditListTitleDialog";
import EditListDescriptionDialog from "./EditListDescriptionDialog";
import EditListCoverDialog from "./EditListCoverDialog";
import EditListTagsDialog from "./EditListTagsDialog";
import EditPrivateDialog from "./EditPrivateDialog";
import EditListItemDialog from "./EditListItemDialog";
import { EditListItemFormValues } from "../schemas/list.schema";
import DeleteListItem from "./DeleteListitem";
import MoveListItemDialog from "./MoveListItemDialog";
import CreateShareLinkDialog from "./CreateShareLinkDialog";
import ShareLink from "./ShareLink";

type MyListDetailProps = {
  id: string;
};

export default function MyListDetail({ id }: MyListDetailProps) {
  const [getMyList, { data, isLoading, isError }] =
    useLazyGetMyListByIdQuery();

  useEffect(() => {
    getMyList(id);
  }, [getMyList, id]);

  if (isLoading) {
    return <p>در حال دریافت لیست...</p>;
  }

  if (isError) {
    return <p>دریافت لیست با خطا مواجه شد.</p>;
  }

  if (!data) {
    return <p>لیست پیدا نشد.</p>;
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-xl border">
        {data.coverUrl ? (
          <div className="relative aspect-[3/1] flex items-center gap-1.5">
            <img
              src={data.coverUrl}
              alt={data.title}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[3/1] items-center justify-center bg-muted">
            بدون کاور
          </div>
        )}

        <EditListCoverDialog id={id} coverUrl={data.coverUrl} />

        <div className="space-y-5 p-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <EditListTitleDialog
                id={id}
                title={data.title}
                onUpdated={() => getMyList(id)}
              />
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  توضیحات
                </p>

                <EditListDescriptionDialog
                  id={id}
                  description={data.description ?? ""}
                  onUpdated={() => getMyList(id)}
                />
              </div>

              {data.description && <p>{data.description}</p>}
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <p className="mb-2 text-sm text-muted-foreground">
                برچسب‌ها
              </p>

              <EditListTagsDialog id={id} tags={data.tags} />
            </div>

            {data.tags.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 text-sm"
                      dir="ltr"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  حریم خصوصی
                </p>

                <EditPrivateDialog id={id} privacy={data.privacy} />
              </div>

              <p className="mt-1 font-semibold" dir="ltr">
                {data.privacy}
              </p>

              {data.privacy === "LINK_ONLY" && (
                <div className="mt-4 border-t pt-4">
                  {data.shareSlug ? (
                    <ShareLink
                      listId={data.id}
                      shareSlug={data.shareSlug}
                      shareExpiry={data.shareExpiry}
                    />
                  ) : (
                    <CreateShareLinkDialog listId={data.id} />
                  )}
                </div>
              )}
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                تعداد فیلم‌ها
              </p>
              <p className="mt-1 font-semibold">
                {data.items.length}
              </p>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                تعداد بازدید
              </p>
              <p className="mt-1 font-semibold">
                {data.viewCount}
              </p>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                آخرین بروزرسانی
              </p>
              <p className="mt-1 font-semibold">
                {new Date(data.updatedAt).toLocaleDateString("fa-IR")}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                تعداد نظرات
              </p>
              <p className="mt-1 font-semibold">
                {data._count.comments}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                تعداد واکنش‌ها
              </p>
              <p className="mt-1 font-semibold">
                {data._count.reactions}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                تعداد ذخیره‌ها
              </p>
              <p className="mt-1 font-semibold">
                {data._count.saves}
              </p>
            </div>

            {data.publishedAt && (
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">
                  تاریخ انتشار
                </p>
                <p className="mt-1 font-semibold">
                  {new Date(data.publishedAt).toLocaleDateString("fa-IR")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">فیلم‌های لیست</h2>

        <div className="space-y-4">
          {data.items.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-xl border p-4"
            >
              <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.title.posterUrl}
                  alt={item.title.titleEn}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">
                    عنوان انگلیسی
                  </p>

                  <h3 className="font-semibold" dir="ltr">
                    {item.title.titleEn}
                  </h3>

                  {item.title.titleFa && (
                    <div className="mt-2">
                      <p className="mb-1 text-sm text-muted-foreground">
                        عنوان فارسی
                      </p>
                      <p>{item.title.titleFa}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {item.title.year && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        سال
                      </p>
                      <p className="text-sm font-medium">
                        {item.title.year}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-muted-foreground">
                      نوع محتوا
                    </p>
                    <p
                      className="text-sm font-medium"
                      dir="ltr"
                    >
                      {item.title.mediaType}
                    </p>
                  </div>

                  {item.title.avgRating !== null && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        امتیاز
                      </p>
                      <p className="text-sm font-medium" dir="ltr">
                        ⭐ {item.title.avgRating}
                      </p>
                    </div>
                  )}
                </div>

                {item.title.genres.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm text-muted-foreground">
                      ژانرها
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.title.genres.map((genre) => (
                        <span
                          key={genre}
                          className="rounded-md bg-muted px-2 py-1 text-xs"
                          dir="ltr"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap justify-between gap-3 border-t pt-3">
                  <div className="flex gap-6">
                    <MoveListItemDialog
                      itemId={item.id}
                      listId={id}
                      order={item.order}
                    />

                    <EditListItemDialog
                      itemId={item.id}
                      listId={id}
                      note={item.note}
                      order={item.order}
                      status={item.status as EditListItemFormValues["status"]}
                    />

                    <DeleteListItem itemId={item.id} listId={id} />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        وضعیت تماشا
                      </p>
                      <p
                        className="text-sm font-medium"
                        dir="ltr"
                      >
                        {item.status}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        ترتیب در لیست
                      </p>
                      <p className="text-sm font-medium">
                        {item.order}
                      </p>
                    </div>

                    {item.note && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          یادداشت
                        </p>
                        <p className="text-sm font-medium">
                          {item.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}