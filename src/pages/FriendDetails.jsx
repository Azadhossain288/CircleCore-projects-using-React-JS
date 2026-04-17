import { useParams, useNavigate } from "react-router-dom";
import { useTimeline } from "../context/TimelineContext";
import toast from "react-hot-toast";
import {
  Phone,
  MessageSquare,
  Video,
  Clock,
  Archive,
  Trash2,
  ArrowLeft,
  Calendar,
  Target,
  Mail,
  Edit3,
} from "lucide-react";
import friendsData from "../data/friends.json";

const statusConfig = {
  overdue: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  "almost due": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  "on-track": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
};

export default function FriendDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();
  const friend = friendsData.find((f) => f.id === parseInt(id));

  if (!friend) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-gray-400 mb-4">Friend not found.</p>
        <button onClick={() => navigate("/")} className="text-violet-600 underline text-sm">
          Go back home
        </button>
      </div>
    );
  }

  const s = statusConfig[friend.status] || statusConfig["on-track"];

  const handleCheckIn = (type) => {
    addEntry(type, friend.name);
    const emojis = { Call: "📞", Text: "💬", Video: "🎥" };
    toast.success(`${emojis[type]} ${type} with ${friend.name} logged!`, {
      duration: 3000,
    });
  };

  const progressPercent = Math.min(
    Math.round((friend.days_since_contact / friend.goal) * 100),
    100
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-400 hover:text-violet-600 mb-6 text-sm font-medium transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Friends
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ─────── LEFT COLUMN ─────── */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Profile Picture */}
            <div className="text-center mb-5">
              <div className="relative inline-block">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-violet-100"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=7c3aed&color=fff&size=96`;
                  }}
                />
              </div>
              <h2 className="text-xl font-black text-gray-800 mt-3">{friend.name}</h2>
              <span
                className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full border capitalize ${s.bg} ${s.text} ${s.border}`}
              >
                {friend.status}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 justify-center mb-4">
              {friend.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-violet-50 text-violet-600 px-2.5 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-500 leading-relaxed text-center mb-4">
              {friend.bio}
            </p>

            {/* Email */}
            <a
              href={`mailto:${friend.email}`}
              className="flex items-center justify-center gap-2 text-sm text-violet-500 hover:text-violet-700 transition-colors"
            >
              <Mail size={14} />
              {friend.email}
            </a>

            {/* Divider */}
            <div className="border-t border-gray-100 my-5" />

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button className="w-full flex items-center gap-2 justify-center text-sm py-2.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all font-medium border border-amber-200">
                <Clock size={15} />
                Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center gap-2 justify-center text-sm py-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all font-medium border border-gray-200">
                <Archive size={15} />
                Archive
              </button>
              <button className="w-full flex items-center gap-2 justify-center text-sm py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-medium border border-red-200">
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* ─────── RIGHT COLUMN ─────── */}
        <div className="md:col-span-2 space-y-5">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Days Since Contact",
                value: friend.days_since_contact,
                icon: <Clock size={18} />,
                gradient: "from-blue-500 to-indigo-500",
              },
              {
                label: "Goal (days)",
                value: friend.goal,
                icon: <Target size={18} />,
                gradient: "from-violet-500 to-purple-500",
              },
              {
                label: "Next Due Date",
                value: friend.next_due_date,
                icon: <Calendar size={18} />,
                gradient: "from-emerald-500 to-teal-500",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mx-auto mb-3 shadow-md`}
                >
                  <span className="text-white">{card.icon}</span>
                </div>
                <div className="font-black text-gray-800 text-lg leading-tight">{card.value}</div>
                <div className="text-xs text-gray-400 mt-1 font-medium">{card.label}</div>
              </div>
            ))}
          </div>

          {/* Relationship Goal */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Relationship Goal</h3>
              <button className="flex items-center gap-1.5 text-xs text-violet-500 hover:text-violet-700 font-medium transition-colors bg-violet-50 px-3 py-1.5 rounded-full">
                <Edit3 size={12} />
                Edit
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-3">
              Contact every{" "}
              <span className="text-violet-600 font-bold">{friend.goal} days</span>
            </p>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  progressPercent >= 100
                    ? "bg-gradient-to-r from-red-500 to-rose-500"
                    : progressPercent >= 70
                    ? "bg-gradient-to-r from-amber-400 to-orange-400"
                    : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-xs text-gray-400">
                {friend.days_since_contact} / {friend.goal} days used
              </p>
              <p className="text-xs font-semibold text-gray-500">{progressPercent}%</p>
            </div>
          </div>

          {/* Quick Check-In */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-1">Quick Check-In</h3>
            <p className="text-xs text-gray-400 mb-5">
              Log an interaction — it will appear in your Timeline
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  type: "Call",
                  icon: <Phone size={20} />,
                  gradient: "from-emerald-500 to-green-400",
                  shadow: "shadow-emerald-200",
                  bg: "hover:bg-emerald-50",
                  border: "border-emerald-200",
                  text: "text-emerald-700",
                },
                {
                  type: "Text",
                  icon: <MessageSquare size={20} />,
                  gradient: "from-blue-500 to-sky-400",
                  shadow: "shadow-blue-200",
                  bg: "hover:bg-blue-50",
                  border: "border-blue-200",
                  text: "text-blue-700",
                },
                {
                  type: "Video",
                  icon: <Video size={20} />,
                  gradient: "from-violet-500 to-purple-400",
                  shadow: "shadow-violet-200",
                  bg: "hover:bg-violet-50",
                  border: "border-violet-200",
                  text: "text-violet-700",
                },
              ].map(({ type, icon, gradient, shadow, bg, border, text }) => (
                <button
                  key={type}
                  onClick={() => handleCheckIn(type)}
                  className={`group flex flex-col items-center gap-3 py-5 rounded-2xl border ${border} ${bg} transition-all duration-200 hover:scale-105 hover:shadow-lg ${shadow}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <span className="text-white">{icon}</span>
                  </div>
                  <span className={`text-sm font-bold ${text}`}>{type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
