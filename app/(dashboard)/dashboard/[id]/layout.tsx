type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

export default async function DashboardLayout({
  children,
  params,
}: Props) {
  const { id } = await params;

  return (
    <div>
      <aside>
        Sidebar
        <p>User ID: {id}</p>
      </aside>

      <main>{children}</main>
    </div>
  );
}