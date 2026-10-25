import MyLists from "@/features/lists/components/MyLists";


export default function ListsPage() {
  return (
    <div className="p-6 mt-8">
      <h1 className="mb-6 text-2xl font-bold">
        لیست‌های من
      </h1>

      <MyLists />
    </div>
  );
}