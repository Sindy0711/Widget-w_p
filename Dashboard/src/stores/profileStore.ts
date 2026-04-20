import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProfileStore = {
  name: string;
  city: string;
  hasCompletedSetup: boolean;

  // action
  setProfileData: (data: any) => void;
  saveProfile: () => void;
};

const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      name: "",
      city: "",
      hasCompletedSetup: false,
      setProfileData: (data) => set((state) => ({ ...state, ...data })),
      saveProfile: () => {
        const { name, city } = get();
        if (name.trim() && city.trim()) {
          set({ hasCompletedSetup: true });
        } else {
          console.warn("Cannot save: Name and City are required.");
        }
      },
    }),
    {
      name: "profile-storage",
    },
  ),
);

export default useProfileStore;
