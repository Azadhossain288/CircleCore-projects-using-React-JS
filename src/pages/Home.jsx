import React from 'react';
import { useNavigate } from 'react-router-dom';
import FriendCard from '../components/FriendCard';
import friendsData from '../data/friends.json'; 

export default function Home() {
  const navigate = useNavigate();

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