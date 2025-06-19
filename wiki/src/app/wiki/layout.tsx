import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WikiNavbar from "@/components/wiki/WikiNavbar";
import WikiSidebar from "@/components/wiki/WikiSidebar";
import wikiData from "@/wdata/list";

export default async function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <WikiSidebar categories={wikiData} />
      <main className="flex-1 overflow-auto">
        <WikiNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
