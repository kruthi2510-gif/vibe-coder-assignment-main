import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return String(count);
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const addProfile = useSelectedProfilesStore((state) => state.addProfile);

  const selectedProfiles = useSelectedProfilesStore(
    (state) => state.selectedProfiles
  );

  const alreadyAdded = selectedProfiles.some(
    (selected) => selected.user_id === profile.user_id
  );

  const handleClick = () => {
    onProfileClick?.(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      data-search={searchQuery}
      className="
      w-full
      cursor-pointer
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-5
      shadow-sm
      transition-all
      duration-200
      hover:-translate-y-1
      hover:shadow-lg
      "
    >
      <div className="flex items-center gap-4">

        <img
          src={profile.picture}
          alt={profile.fullname}
          className="h-16 w-16 rounded-full object-cover border border-slate-200"
        />

        <div className="flex-1">

          <div className="flex items-center gap-2">

            <h3 className="font-semibold text-slate-900">
              {profile.fullname}
            </h3>

            <VerifiedBadge verified={profile.is_verified} />

          </div>

          <p className="text-sm text-slate-500">
            @{profile.username}
          </p>

          <p className="mt-2 text-sm text-slate-700">
            {formatFollowersLocal(profile.followers)} followers
          </p>

        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addProfile(profile);
          }}
          disabled={alreadyAdded}
          className={`
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            transition

            ${
              alreadyAdded
                ? "bg-green-100 text-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
          `}
        >
          {alreadyAdded ? "Added" : "Add to List"}
        </button>

      </div>
    </div>
  );
}