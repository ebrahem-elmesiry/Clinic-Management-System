import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 md:fixed left-0 top-0 min-h-full">
      <SidebarContent />
    </aside>
  );
}
