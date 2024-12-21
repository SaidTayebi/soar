import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";
import Topbar from "./_components/topbar";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main className="bg-background p-6 md:p-10 w-full  mt-40 lg:mt-24">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
