import React from 'react';
import { useNavigate } from 'react-router-dom';
import FriendCard from '../components/FriendCard';
import friendsData from '../data/friends.json'; 

export default function Home() {
  const navigate = useNavigate();


  // 1. Total Friends: JSON array-te koyta object ache
  const totalFriends = friendsData.length;
  
  // 2. On Track: Jader status shudhu "on-track"
  const onTrackCount = friendsData.filter(f => f.status === "on-track").length;
  
  // 3. Need Attention: Jader status "overdue" ba "almost due"
  const needAttentionCount = friendsData.filter(
    f => f.status === "overdue" || f.status === "almost due"
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="btn btn-neutral mt-6 bg-[#2d433d] border-none">+ Add a Friend</button>

        {/* Dynamic Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto my-4">
          {/* Total */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-3xl font-black text-[#2d433d]">{totalFriends}</p>
            <p className="text-sm text-gray-500">Total Friends</p>
          </div>

          {/* On Track */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-3xl font-black text-emerald-600">{onTrackCount}</p>
            <p className="text-sm text-gray-500">On Track</p>
          </div>

          {/* Need Attention */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-3xl font-black text-amber-500">{needAttentionCount}</p>
            <p className="text-sm text-gray-500">Need Attention</p>
          </div>

          {/* interactions - apatoto manually 12 rakhlam */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-3xl font-black text-blue-500">12</p>
            <p className="text-sm text-gray-500">Interactions</p>
          </div>
        </div>

      </header>

      {/* Friends Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {friendsData.map((friend) => (
          <FriendCard 
            key={friend.id} 
            friend={friend} 
            onClick={() => navigate(`/user/${friend.id}`)} 
          />
        ))}
      </div>
    </div>
  );
}