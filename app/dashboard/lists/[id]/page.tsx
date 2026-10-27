import MyListDetail from "@/features/lists/components/MyListDetail";
import { Suspense } from "react";


export default function ListsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p>در حال دریافت لیست...</p>}>
      <ListDetail params={params} />
    </Suspense>
  );
}

async function ListDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <MyListDetail id={id} />;
}