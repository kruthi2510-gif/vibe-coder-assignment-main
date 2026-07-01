import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Search Creators
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Browse creators across multiple platforms and build your selected list.
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by username or creator name..."
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-slate-50
            px-4
            py-3
            text-sm
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {PLATFORMS.map((platform) => (
          <button
            key={platform}
            onClick={() => onChange(platform)}
            className={`
              rounded-full
              px-5
              py-2.5
              text-sm
              font-medium
              transition-all

              ${
                selected === platform
                  ? "bg-blue-600 text-white shadow"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
              }
            `}
          >
            {getPlatformLabel(platform)}
          </button>
        ))}
      </div>
    </section>
  );
}