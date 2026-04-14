import logoUrl from "../../assets/react.svg";
import { FaHome } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaKey } from "react-icons/fa6";

const navItems = [
  {
    label: "Home",
    href: "#",
    icon: FaHome,
    isActive: true,
  },
  {
    label: "Setting",
    href: "#",
    icon: IoIosSettings,
    isActive: false,
  },
  {
    label: "Api Keys",
    href: "#",
    icon: FaKey,
    isActive: false,
  },
];

export default function SideBar() {
  return (
    <aside className=" h-screen sticky top-0 border-b border-slate-800 bg-slate-950 px-3 py-3 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-4 lg:py-4">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950 px-3 py-3.5">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-800 bg-slate-900">
            <img className="h-8 w-8" src={logoUrl} alt="Logo" />
          </div>

          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Dashboard
            </p>
            <h1 className="mt-1 text-base font-semibold tracking-tight text-white">
              Pulse Board
            </h1>
          </div>
        </div>

        <div className="mt-8">
          <p className="px-3 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Navigation
          </p>
          <nav className="mt-3" aria-label="Primary">
            <ul className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 transition-colors duration-200 ${
                        item.isActive
                          ? "border-slate-800 bg-slate-900 text-white"
                          : "border-transparent bg-transparent text-slate-400 hover:border-slate-800 hover:bg-slate-900/70 hover:text-slate-200"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-base transition-colors ${
                          item.isActive
                            ? "border-slate-700 bg-slate-950 text-white"
                            : "border-slate-800 bg-slate-950 text-slate-400 group-hover:text-slate-200"
                        }`}
                      >
                        <Icon />
                      </div>

                      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                        <span className="truncate text-sm font-medium tracking-[0.01em]">
                          {item.label}
                        </span>
                        {item.isActive ? (
                          <span className="rounded-full border border-slate-700 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Live
                          </span>
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-slate-500" />
                        )}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="mt-auto pt-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <div>
                <p className="text-sm font-medium text-slate-200">Online</p>
                <p className="text-xs text-slate-500">Morning Flow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
