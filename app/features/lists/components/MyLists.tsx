"use client";

import Link from "next/link";
import { useGetMyListsQuery } from "../services/lists.api";

export default function MyLists() {
  const { data, isLoading, isError } = useGetMyListsQuery();

  if (isLoading) {
    return <p>در حال دریافت لیست‌ها...</p>;
  }

  if (isError) {
    return <p>دریافت لیست‌ها با خطا مواجه شد.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {data?.items.map((list) => (
        <Link
          key={list.id}
          href={`/dashboard/lists/${list.id}`}
          className="overflow-hidden rounded-xl border bg-card transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="aspect-video overflow-hidden">
            <img
              src={list.coverUrl}
              alt={list.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-3 p-4">
            <h2 className="text-lg font-semibold">
              {list.title}
            </h2>

            <p className="text-sm text-muted-foreground">
              {list.description}
            </p>

            <p className="text-xs text-muted-foreground">
              ساخته شده در{" "}
              {new Date(list.createdAt).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}