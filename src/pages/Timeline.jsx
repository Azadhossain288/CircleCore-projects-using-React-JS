
import { useState } from "react";
import { useTimeline } from "../context/TimelineContext";
import { Phone, MessageSquare, Video, Filter, Clock } from "lucide-react";

const typeConfig = {
  Call: {
    icon: <Phone size={15} />,
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  Text: {
    icon: <MessageSquare size={15} />,
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
  },
  Video: {
    icon: <Video size={15} />,
    bg: "bg-violet-500/10",
    text: "text-violet-500",
    border: "border-violet-500/20",
    dot: "bg-violet-400",
  },
};

const filters = ["All", "Call", "Text", "Video"];

export default function Timeline() {
  const { entries } = useTimeline();
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? entries : entries.filter((e) => e.type === active);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">Timeline</h1>
        <p className="text-gray-400 text-sm mt-1">
          Your complete history of interactions with friends
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium mr-1">
          <Filter size={13} />
          Filter:
        </div>
        {filters.map((f) => {
          const cfg = f !== "All" ? typeConfig[f] : null;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full font-medium transition-all duration-200 ${
                active === f
                  ? "bg-[#1a1a2e] text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {cfg && <span className={active === f ? "text-white" : cfg.text}>{cfg.icon}</span>}
              {f}
            </button>
          );
        })}

        <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* Timeline List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Clock size={28} className="text-gray-300" />
          </div>
          <h3 className="font-bold text-gray-500 mb-1">No entries yet</h3>
          <p className="text-gray-400 text-sm max-w-xs">
            Go to a friend's page and click Call, Text, or Video to log an interaction.
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-violet-300 via-gray-200 to-transparent" />

          <div className="space-y-4 pl-14">
            {filtered.map((entry, i) => {
              const cfg = typeConfig[entry.type];
              return (
                <div
                  key={entry.id}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-9 top-4 w-4 h-4 rounded-full ${cfg.dot} ring-4 ring-white shadow-md`}
                  />

                  {/* Card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${cfg.bg} ${cfg.text} flex items-center justify-center flex-shrink-0 border ${cfg.border}`}
                        >
                          {cfg.icon}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{entry.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text} border ${cfg.border}`}
                        >
                          {entry.type}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{formatTime(entry.date)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
