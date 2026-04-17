
import { useTimeline } from "../context/TimelineContext";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Phone, MessageSquare, Video, BarChart3 } from "lucide-react";

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6"];

const typeIcons = {
  Call: <Phone size={16} />,
  Text: <MessageSquare size={16} />,
  Video: <Video size={16} />,
};

const typeBg = {
  Call: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  Text: "bg-blue-500/10 text-blue-600 border-blue-200",
  Video: "bg-violet-500/10 text-violet-600 border-violet-200",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] text-white text-xs px-3 py-2 rounded-xl shadow-lg">
        <p className="font-bold">{payload[0].name}</p>
        <p className="text-gray-300">{payload[0].value} interaction{payload[0].value !== 1 ? "s" : ""}</p>
      </div>
    );
  }
  return null;
};

export default function Stats() {
  const { entries } = useTimeline();

  const counts = entries.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: "Call", value: counts.Call || 0 },
    { name: "Text", value: counts.Text || 0 },
    { name: "Video", value: counts.Video || 0 },
  ];

  const hasData = data.some((d) => d.value > 0);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-800">Friendship Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">
          Insights into how you connect with your circle
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {data.map((item, i) => (
          <div
            key={item.name}
            className={`bg-white rounded-2xl border shadow-sm p-5 flex items-center gap-4 ${typeBg[item.name]}`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: COLORS[i] + "20" }}
            >
              <span style={{ color: COLORS[i] }}>{typeIcons[item.name]}</span>
            </div>
            <div>
              <p className="text-2xl font-black" style={{ color: COLORS[i] }}>
                {item.value}
              </p>
              <p className="text-xs font-semibold text-gray-500">{item.name}s logged</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pie Chart Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Interaction Breakdown</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {total} total interaction{total !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#1a1a2e] flex items-center justify-center">
            <BarChart3 size={18} className="text-violet-400" />
          </div>
        </div>

        {!hasData ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
              <BarChart3 size={32} className="text-gray-200" />
            </div>
            <h3 className="font-bold text-gray-400 mb-1">No data yet</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Log some interactions from friend pages to see your analytics here.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data.filter((d) => d.value > 0)}
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={55}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={true}
              >
                {data
                  .filter((d) => d.value > 0)
                  .map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
                  ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span className="text-sm text-gray-600 font-medium">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}


