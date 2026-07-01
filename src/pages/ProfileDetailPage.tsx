import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "Unknown";

  const [profileData, setProfileData] =
    useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  const addProfile = useSelectedProfilesStore((state) => state.addProfile);

  const selectedProfiles = useSelectedProfilesStore(
    (state) => state.selectedProfiles
  );

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile.</p>
      </Layout>
    );
  }

  if (!loaded) {
  return (
    <Layout>
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </div>
    </Layout>
  );
}
  if (!profileData) {
  return (
    <Layout>
      <div className="mx-auto mt-20 max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <span className="text-2xl font-semibold text-slate-600">⋯</span>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          Profile Details Coming Soon
        </h1>

        <p className="mt-3 text-slate-600">
          Detailed insights for this creator are currently unavailable.
        </p>

        <p className="mt-2 text-sm text-slate-500">
          We're still working on expanding profile coverage. Please check back later or explore other creators.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Back to Search
        </Link>

      </div>
    </Layout>
  );
}

  const user: FullUserProfile = profileData.data.user_profile;

  const alreadyAdded = selectedProfiles.some(
    (profile) => profile.user_id === user.user_id
  );

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          ← Back to Search
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col items-center text-center">

            <img
              src={user.picture}
              alt={user.fullname}
              className="h-28 w-28 rounded-full border border-slate-200 object-cover shadow-sm"
            />

            <div className="mt-5 flex items-center gap-2">

              <h1 className="text-2xl font-bold text-slate-900">
                {user.fullname}
              </h1>

              <VerifiedBadge verified={user.is_verified} />

            </div>

            <p className="mt-2 text-slate-500">
              @{user.username}
            </p>

            <span className="mt-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-sm font-medium capitalize text-slate-600">
              {platform}
            </span>

            {user.description && (
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600">
                {user.description}
              </p>
            )}

            <div className="mt-6 flex w-full flex-wrap items-stretch justify-center gap-4">

              <StatCard
                title="Followers"
                value={formatFollowersDetail(user.followers)}
              />

              <StatCard
                title="Engagement"
                value={formatEngagementRate(user.engagement_rate)}
              />

              {user.posts_count !== undefined && (
                <StatCard
                  title="Posts"
                  value={String(user.posts_count)}
                />
              )}

              {user.avg_likes !== undefined && (
                <StatCard
                  title="Average Likes"
                  value={formatFollowersDetail(user.avg_likes)}
                />
              )}

              {user.avg_comments !== undefined && (
                <StatCard
                  title="Average Comments"
                  value={String(user.avg_comments)}
                />
              )}

              {user.avg_views !== undefined &&
                user.avg_views > 0 && (
                  <StatCard
                    title="Average Views"
                    value={formatFollowersDetail(user.avg_views)}
                  />
                )}

            </div>

          </div>

          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3">

            <button
              onClick={() => addProfile(user)}
              disabled={alreadyAdded}
              className={`rounded-xl px-5 py-3 font-medium transition ${
                alreadyAdded
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {alreadyAdded ? "Added to List" : "Add to List"}
            </button>

            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-100"
              >
                View Profile
              </a>
            )}

          </div>

        </div>

      </div>

    </Layout>
  );
}

interface StatCardProps {
  title: string;
  value: string;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="w-40 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:bg-white hover:shadow-sm">
      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}
