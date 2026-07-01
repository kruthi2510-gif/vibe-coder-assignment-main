import { useMemo, useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(
    () => extractProfiles(platform),
    [platform]
  );

  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  const selectedProfiles = useSelectedProfilesStore(
    (state) => state.selectedProfiles
  );

  const removeProfile = useSelectedProfilesStore(
    (state) => state.removeProfile
  );

  const handleProfileClick = (username: string) => {
    console.log("Clicked profile:", username);
  };

  return (
    <Layout>
      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="mb-6 mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-800">
            {filtered.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-800">
            {allProfiles.length}
          </span>{" "}
          creators on{" "}
          <span className="capitalize">{platform}</span>
        </p>
      </div>

      <div className="flex items-start gap-8">

        <div className="flex-1">
          <ProfileList
            profiles={filtered}
            platform={platform}
            searchQuery={searchQuery}
            onProfileClick={handleProfileClick}
          />
        </div>

        <aside className="sticky top-24 w-[320px] self-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 border-b border-slate-200 pb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Your Selection
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {selectedProfiles.length} creator
              {selectedProfiles.length !== 1 && "s"} selected
            </p>
          </div>

          {selectedProfiles.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="text-sm font-medium text-slate-700">
                No creators selected
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Start building your shortlist by adding creators.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedProfiles.map((profile) => (
                <div
                  key={profile.user_id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:bg-white"
                >
                  <div className="flex items-center gap-3">

                    <img
                      src={profile.picture}
                      alt={profile.fullname}
                      className="h-12 w-12 rounded-full border border-slate-200 object-cover"
                    />

                    <div className="min-w-0">

                      <p className="truncate font-medium text-slate-900">
                        {profile.fullname}
                      </p>

                      <p className="truncate text-sm text-slate-500">
                        @{profile.username}
                      </p>

                    </div>
                  </div>

                  <button
                    onClick={() => removeProfile(profile.user_id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </aside>

      </div>
    </Layout>
  );
}