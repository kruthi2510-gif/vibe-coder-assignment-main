import { create } from "zustand";
import type { UserProfileSummary } from "@/types";

interface SelectedProfilesStore {
  selectedProfiles: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
}

export const useSelectedProfilesStore = create<SelectedProfilesStore>((set) => ({
  selectedProfiles: [],

  addProfile: (profile) =>
    set((state) => ({
      selectedProfiles: [...state.selectedProfiles, profile],
    })),
}));