import MainContent from "../components/MainContent/MainContent";
import  Settings from "../components/Settings/Settings";
import SideBar from "../components/Sidebar/Sidebar";
import { HashRouter, Routes, Route } from "react-router-dom";

export default function MainLayout() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
        <SideBar />
        <main className="min-w-0 bg-slate-950">
          <div className="min-h-screen p-6 sm:p-10 text-[var(--text)] bg-[var(--bg)] font-sans">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/api-keys" element={<div>API Keys</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}
