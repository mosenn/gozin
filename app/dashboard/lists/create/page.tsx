import CreateListForm from "@/features/lists/components/CreateListForm";


export default function CreateListPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">ساخت لیست</h1>

      <CreateListForm />
    </div>
  );
}