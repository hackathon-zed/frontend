import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
};

export default AdminLayout;
