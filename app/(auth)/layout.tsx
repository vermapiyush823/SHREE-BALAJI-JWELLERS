export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-800 h-[100vh] flex align-middle justify-center">
      <section className="flex align-middle justify-center items-center">
        <div>{children}</div>
      </section>
    </main>
  );
}
