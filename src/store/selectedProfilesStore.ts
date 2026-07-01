import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface SelectedProfilesStore {
  selectedProfiles: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
}

export const useSelectedProfilesStore = create<SelectedProfilesStore>()(
  persist(
    (set) => ({
      selectedProfiles: [],

      addProfile: (profile) =>
        set((state) => {
          const alreadyExists = state.selectedProfiles.some(
            (selected) => selected.user_id === profile.user_id
          );

          if (alreadyExists) {
            return state;
          }

          return {
            selectedProfiles: [...state.selectedProfiles, profile],
          };
        }),

      removeProfile: (userId) =>
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (profile) => profile.user_id !== userId
          ),
        })),
    }),
    {
      name: "selected-profiles",
    }
  )
);