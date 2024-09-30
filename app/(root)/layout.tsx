"use server";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import { getAuthToken } from "../../lib/getAuthToken";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthToken();
  return (
    <main>
      <Navbar user={user?.toString()} />
      <section className="pt-[105px] min-h-[90vh]">
        <div>{children}</div>
      </section>
      <Footer />
    </main>
  );
}
