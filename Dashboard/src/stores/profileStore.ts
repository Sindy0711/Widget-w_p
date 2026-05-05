import { create } from "zustand";
import { persist } from "zustand/middleware";

const normalizeProfileValue = (value: string, maxLength: number) =>
  value.trim().replace(/\s+/g, " ").slice(0, maxLength);

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
        set({
          name: normalizeProfileValue(name, 60),
          city: normalizeProfileValue(city, 80),
          hasCompletedSetup: true,
        });
      },
    }),
    {
      name: "profile-storage",
    },
  ),
);

export default useProfileStore;
