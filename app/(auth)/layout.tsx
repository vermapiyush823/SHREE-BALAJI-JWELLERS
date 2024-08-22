export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <section className="pt-[105px] min-h-[90vh]">
        <div>{children}</div>
      </section>
    </main>
  );
}
