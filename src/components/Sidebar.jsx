import { BiLogOut } from 'react-icons/bi';
import { FaHome, FaChartLine, FaMusic, FaRegDotCircle, FaUserFriends } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-[#29223b] to-[#11041c] p-6 text-white">
      <div className="text-green-400 text-3xl font-bold mb-8 flex items-center">
        <span className="ml-2">musfluent</span>
      </div>
      <nav className="flex flex-col space-y-6">
        <a href="/discover" className="flex items-center space-x-3 hover:text-green-400 transition duration-200">
          <FaHome className="text-lg" />
          <span className="text-lg">Discover</span>
        </a>
        <a href="/trends" className="flex items-center space-x-3 hover:text-green-400 transition duration-200">
          <FaChartLine className="text-lg" />
          <span className="text-lg">Trends</span>
        </a>
        <a href="/genres" className="flex items-center space-x-3 hover:text-green-400 transition duration-200">
          <FaMusic className="text-lg" />
          <span className="text-lg">Genres</span>
        </a>
        <a href="/radio" className="flex items-center space-x-3 hover:text-green-400 transition duration-200">
          <FaRegDotCircle className="text-lg" />
          <span className="text-lg">Radio</span>
        </a>
        <a href="/albums" className="flex items-center space-x-3 hover:text-green-400 transition duration-200">
          <FaUserFriends className="text-lg" />
          <span className="text-lg">Albums</span>
        </a>
        <a href="/" className="flex items-center space-x-3 hover:text-green-400 transition duration-200">
          <BiLogOut className="text-lg" />
          <span className="text-lg">Logout</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
