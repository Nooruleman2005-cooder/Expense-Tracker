import { Link } from "react-router-dom";
import { auth } from '../firebaseconfig.js';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('User SignOut Successfully');
      navigate('/login')
    } catch (error) {
      console.error(error);
      alert('Error signing out');
    }
  };

  return (
    <>
      <div className="md:hidden fixed top-24 left-4 z-50">
        <button onClick={() => setOpen(true)} className="bg-yellow-500 p-2 rounded shadow">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div className="hidden md:block fixed top-20 left-0 z-40 w-64 h-[calc(100vh-80px)] bg-yellow-500 p-4 shadow-lg">
        <SidebarContent handleSignOut={handleSignOut} />
      </div>


      {open && (
        <>
          <div className="fixed inset-0 bg-transparent z-30" onClick={() => setOpen(false)}></div>

          <div className="fixed top-20 left-0 z-40 w-64 h-[calc(100vh-80px)] bg-yellow-500 p-4 shadow-lg">
            <div className="text-right mb-4">
              <button onClick={() => setOpen(false)} className="text-white">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <SidebarContent handleSignOut={handleSignOut} />
          </div>
        </>
      )}
    </>
  );
};

const SidebarContent = ({ handleSignOut }) => (
  <ul className="space-y-6">
    <li>
      <Link to="/profile" className="flex items-center space-x-3 font-semibold">
        <i className="fa-solid fa-bars"></i>
        <span>Dashboard</span>
      </Link>
    </li>
    <li>
      <Link to="/add-expense" className="flex items-center space-x-3 font-semibold">
        <i className="fa-solid fa-plus"></i>
        <span>Add Amount</span>
      </Link>
    </li>
    <li>
      <Link to="/add-trans" className="flex items-center space-x-3 font-semibold">
        <i className="fa-solid fa-plus"></i>
        <span>Add Expense</span>
      </Link>
    </li>
    <li>
      <Link to="/trans" className="flex items-center space-x-3 font-semibold">
        <i className="fa-solid fa-money-check-dollar"></i>
        <span>Transactions</span>
      </Link>
    </li>
    <li>
      <button onClick={handleSignOut} className="text-sm text-red-500">
        Sign Out
      </button>
    </li>
  </ul>
);

export default Sidebar;
