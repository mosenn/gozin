type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DashboardPage({ params }: Props) {
  const { id } = await params;

  return <h1 className="mt-22">Dashboard: {id}</h1>;
}
