import { NavLink } from "react-router-dom";
import { MdHome, MdMenu } from "react-icons/md"; // MdMenu add korlam
import { RiTimeLine } from "react-icons/ri";
import { TfiStatsUp } from "react-icons/tfi";

export default function Navbar() {
  //  styling for active link
  const navStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
      isActive 
      ? "bg-green-500 text-white shadow-md" 
      : "hover:bg-gray-100 text-gray-700 active:bg-gray-200"
    }`;

  return (
    <nav className="navbar bg-white shadow-md px-4 md:px-8 sticky top-0 z-50">
      {/* 1. Logo Section */}
      <div className="flex-1">
        <NavLink to="/" className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Keen<span className="text-green-500">Keeper</span>
        </NavLink>
      </div>

      {/* 2. Mobile Menu (Hamburger Dropdown) */}
      <div className="flex-none md:hidden">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <MdMenu className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-gray-100"
          >
            <li>
              <NavLink to="/" end>
                <MdHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/timeline">
                <RiTimeLine /> Timeline
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats">
                <TfiStatsUp /> Stats
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Desktop Menu Section */}
      <div className="flex-none hidden md:block">
        <ul className="menu menu-horizontal gap-2 p-0">
          <li>
            <NavLink to="/" end className={navStyle}>
              <MdHome className="text-xl" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/timeline" className={navStyle}>
              <RiTimeLine className="text-xl" />
              <span>Timeline</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" className={navStyle}>
              <TfiStatsUp className="text-xl" />
              <span>Stats</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}