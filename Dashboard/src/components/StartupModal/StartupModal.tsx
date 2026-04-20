import type { ChangeEvent, FormEvent } from "react";
import useProfileStore from "../../stores/profileStore";
import { createPortal } from "react-dom";

export default function StartupModal() {
  const { saveProfile, name, city, hasCompletedSetup, setProfileData } =
    useProfileStore();
  if (hasCompletedSetup) return null;
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData({ [name]: value });
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveProfile();
  };


  return createPortal(
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <section  className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          User Info
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              name="name"
              value={name} // From Zustand
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
              City
            </label>
            <select name="city" value={city} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" required>
              <option value="Ho Chi Minh City">Ho Chi Minh City</option>
              <option value="Hanoi">Hanoi</option>
              <option value="Da Lat">Da Lat</option>
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/30"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </section>
    </div>,
    document.body,
  );
}
