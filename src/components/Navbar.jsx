import { Link } from "react-router-dom";

import { MdHome } from "react-icons/md";
import { RiTimeLine } from "react-icons/ri";
import { TfiStatsUp } from "react-icons/tfi";




export default function Navbar() {
  return (
    <div className="navbar bg-white shadow-lg px-4">
      <div className="flex-1">
        <p className="text-3xl font-bold">Keen<span className="text-green-400">Keeper</span></p>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">  <button class="btn btn-success"> <MdHome />Home</button></Link></li>
          <li><Link to="/timeline"> <button class="btn btn-neutral"><RiTimeLine />Timeline</button></Link></li>
          <li><Link to="/stats"> <button class="btn btn-neutral"><TfiStatsUp />Stats</button></Link></li>
        </ul>
      </div>
    </div>
  );
}


