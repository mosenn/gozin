type ListDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function ListDetailsPage({ params }: ListDetailsProps) {
  const { id } = await params;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">جزئیات لیست</h1>
      <p className="mt-2 text-zinc-400">شناسه لیست: {id}</p>
    </main>
  );
}
