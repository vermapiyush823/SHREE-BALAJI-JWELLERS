import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <section className="pt-[105px] min-h-[90vh]">
        <div>{children}</div>
      </section>
      <Footer />
    </main>
  );
}
