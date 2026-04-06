import MainContent from "../component/MainContent";
import SideBar from "../component/Sidebar";

export default function MainLayout() {
  return (
    <div className="app-root flex">
      <SideBar />
      <MainContent />
    </div>
  );
}
