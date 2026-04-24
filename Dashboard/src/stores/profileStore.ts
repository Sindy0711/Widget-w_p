import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProfileStore = {
  name: string;
  city: string;
  hasCompletedSetup: boolean;

  // action
  saveProfile: (name : string, city : string) => void;
};

const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      name: "",
      city: "",
      hasCompletedSetup: false,
      saveProfile: (name, city) => {
        set({ name, city, hasCompletedSetup: true });
      },
    }),
    {
      name: "profile-storage",
    },
  ),
);

export default useProfileStore;
