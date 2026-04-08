import MainContent from "../components/MainContent/MainContent";
import SideBar from "../components/Sidebar/Sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <SideBar />
      <div className="min-w-0 bg-slate-950">
        <MainContent />
      </div>
    </div>
  );
}
