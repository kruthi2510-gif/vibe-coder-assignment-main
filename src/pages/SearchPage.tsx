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

  const handleProfileClick = (username: string) => {
  console.log("Clicked profile:", username);
};

  return (
    <Layout title="Find Influencers">
      <p className="text-gray-500 mb-4 text-sm">
        Browse top creators across social platforms
      </p>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-xs text-gray-400 mb-2">
        Showing {filtered.length} of {allProfiles.length} on {platform}
      </p>


     <div className="flex gap-6 items-start">
  <div className="flex-1">
    <ProfileList
      profiles={filtered}
      platform={platform}
      searchQuery={searchQuery}
      onProfileClick={handleProfileClick}
    />
  </div>

  <div className="w-72 border rounded-lg p-4">
    <h2 className="font-semibold mb-3">
      ⭐ Selected Profiles ({selectedProfiles.length})
    </h2>
    {selectedProfiles.length === 0 ? (
  <p className="text-sm text-gray-500">
    No profiles selected yet.
  </p>
) : (
  <div className="space-y-2">
    {selectedProfiles.map((profile) => (
      <div
  key={profile.user_id}
  className="flex items-center justify-between border rounded p-2"
>
  <div className="flex items-center gap-3">
    <img
      src={profile.picture}
      alt={profile.fullname}
      className="w-10 h-10 rounded-full"
    />

    <div>
      <p className="font-medium">{profile.fullname}</p>
      <p className="text-xs text-gray-500">@{profile.username}</p>
    </div>
  </div>

  <button className="text-red-500 hover:text-red-700">
    ❌
  </button>
</div>
    ))}
  </div>
)}
  </div>
</div>
    </Layout>
  );
}
