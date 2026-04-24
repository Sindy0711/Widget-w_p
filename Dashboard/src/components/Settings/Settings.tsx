import { useState } from "react";
import useClockStore from "../../stores/clockStore";
import useProfileStore from "../../stores/profileStore";
import { FiUser, FiMapPin } from "react-icons/fi";


export default function Settings() {
  const  {settings , saveSettings} = useClockStore();
  const {name , city, saveProfile } = useProfileStore();
  const [isDirty, setIsDirty] = useState(false);

  const [form, setForm] = useState({
    name: name,
    city: city,
    work: settings.work,
    breakMin: settings.break,
    longBreak: settings.longBreak,
  });;
  
  const handleChange = (key : keyof typeof form , value: string | number) =>{ 
    setForm(prev => ({...prev , [key]: value}));
    setIsDirty(true);
  }
  const handleCancel = () => {
    setForm({
      name: name,
      city: city,
      work: settings.work,
      breakMin: settings.break,
      longBreak: settings.longBreak,
    });
    setIsDirty(false);
  };

  const handleSave = () => {
    if(!form.name.trim() || !form.city.trim() ){
      alert("Please fill all fields correctly.");
      return;
    }
    saveProfile(form.name, form.city);
    saveSettings({ work: form.work, break: form.breakMin, longBreak: form.longBreak });
    setIsDirty(false);
  };


  return (
    <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 auto-rows-min ">
      <section className="lg:col-span-12 xl:col-span-6 flex flex-col gap-6 2xl:gap-8">
        <article className="p-8 rounded-3xl flex-1 bg-[var(--surface)] border border-[var(--border)] flex flex-col transition-all hover:shadow-[var(--shadow-soft)] duration-500">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Settings</h1>
          <div className="">
            <p className="text-xs font-semibold uppercase tracking-widest my-4 text-[var(--text-muted)]">
            General
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[var(--text-muted)] flex items-center gap-1.5"><FiUser size={13} />Name</label>
              <input className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500" type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[var(--text-muted)] flex items-center gap-1.5"><FiMapPin size={13} />City</label>
              <input className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500" type="text" value={form.city} onChange={(e) => handleChange("city", e.target.value)} />
            </div>
          </div>
          </div>
          <div className=""> 
            <p className="text-xs font-semibold uppercase tracking-widest my-4 text-[var(--text-muted)]">
            pomodoro
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[var(--text-muted)] flex items-center gap-1.5">Work (min)</label>
              <input className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500" type="number" min="10" max="120" step="5" value={form.work} onChange={(e) => handleChange("work" , e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[var(--text-muted)] flex items-center gap-1.5">Short break</label>
              <input className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500" type="number"  min="5" max="10" step="1" value={form.breakMin}onChange={(e) => handleChange("breakMin" , e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[var(--text-muted)] flex items-center gap-1.5">Long break</label>
              <input className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500" type="number" min="15" max="60" step="5" value={form.longBreak} onChange={(e) => handleChange("longBreak" , e.target.value)}/>
            </div>
          </div></div>
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-[var(--border)]">
            <button
              onClick={handleCancel}
              disabled={!isDirty}
              className="px-5 py-2 rounded-xl text-sm border border-[var(--border)] text-[var(--text)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--surface-secondary)] transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className="px-5 py-2 rounded-xl text-sm bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500  disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
            >
              Save
            </button>
          </div>
        </article>  
      </section>
      {/* <section className="lg:col-span-12 xl:col-span-6 flex flex-col gap-6 2xl:gap-8"></section> */}
    </div>
  )
}

