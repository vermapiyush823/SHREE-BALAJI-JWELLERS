import Navbar from "../../components/navbar/navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <Navbar />
      <section className="flex justify-center pt-[7.72rem]">
        <div>{children}</div>
      </section>
    </main>
  );
}
