import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";
import Topbar from "./_components/topbar";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex h-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Topbar />

          <main className="bg-background">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
