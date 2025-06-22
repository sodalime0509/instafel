import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { WikiSidebar } from "@/components/wiki/WikiSidebar";
import { defaultMetadata } from "@/config/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `Instafel Wiki`,
  description: "You can find eveything about of Instafel from here!",
};

export default async function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <WikiSidebar />
        <main className="flex-1 overflow-auto">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
      <Footer />
    </>
  );
}
