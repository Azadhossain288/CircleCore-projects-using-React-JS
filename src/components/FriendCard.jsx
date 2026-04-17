const statusConfig = {
  "overdue": {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
    dot: "bg-red-400",
    topBorder: "border-t-red-500",
  },
  "almost due": {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
    topBorder: "border-t-amber-400",
  },
  "on-track": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
    topBorder: "border-t-emerald-500",
  },
};

export default function FriendCard({ friend, onClick }) {
  const s = statusConfig[friend.status] || statusConfig["on-track"];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-100 border-t-4 ${s.topBorder} cursor-pointer hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-5 group`}
    >
      {/* Avatar */}
      <div className="relative mx-auto w-fit mb-3">
        <img
          src={friend.picture}
          alt={friend.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-offset-2 ring-violet-200"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=7c3aed&color=fff`;
          }}
        />
        <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ${s.dot} ring-2 ring-white`} />
      </div>

      {/* Name & Days */}
      <h3 className="font-bold text-gray-800 text-center text-sm leading-tight">{friend.name}</h3>
      <p className="text-center text-gray-400 text-xs mt-1">
        {friend.days_since_contact} days since contact
      </p>

      {/* Tags */} 
      <div className="flex flex-wrap gap-1 justify-center mt-3">
        {friend.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Status Badge */}
      <div className={`mt-3 text-center text-xs font-semibold px-3 py-1.5 rounded-full ${s.bg} ${s.text} border ${s.border} capitalize`}>
        {friend.status}
      </div>
    </div>
  );
}
