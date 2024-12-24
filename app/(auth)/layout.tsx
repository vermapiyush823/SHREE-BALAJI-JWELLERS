export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full flex align-middle  justify-center">
      <section className="flex align-middle justify-center items-center">
        <div>{children}</div>
      </section>
    </main>
  );
}
