import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import useProfileStore from "../../stores/profileStore";
import { createPortal } from "react-dom";

export default function StartupModal() {
  const { saveProfile,  hasCompletedSetup,  } =
    useProfileStore();
  const [formData, setFormData] = useState({ name: "", city: "" });
    
  if (hasCompletedSetup) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveProfile(formData.name, formData.city);
  };


  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.section
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-[var(--surface)] p-6 sm:p-10 rounded-2xl shadow-2xl border border-[var(--border)] w-full max-w-md"
      >
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-1">Pulse Board</p>
          <h2 className="text-2xl font-bold text-[var(--text-heading)]">
            Welcome! Let's set you up
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">We only need two things to personalise your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
              Your Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2.5 text-sm text-[var(--text-heading)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              placeholder="e.g. Alex"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
              Your City
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2.5 text-sm text-[var(--text-heading)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              placeholder="e.g. Ho Chi Minh City"
              required
            />
            <p className="mt-1 text-xs text-[var(--text-muted)]">Used for the weather widget.</p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[var(--accent)] hover:opacity-90 text-white font-semibold rounded-xl transition shadow-lg"
            >
              Save &amp; Continue
            </button>
          </div>
        </form>
      </motion.section>
    </motion.div>,
    document.body,
  );
}
