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
    <main className="flex flex-col">
      <Navbar user={user} />
      <section className="min-h-[90vh] mt-16 sm:mt-24 ">
        <div>{children}</div>
      </section>
      <Footer />
    </main>
  );
}
