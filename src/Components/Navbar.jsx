import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slices/AuthSlice";

const Navbar = () => {

  const {isLoggedIn, role} = useSelector((state) => (state?.auth));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleLogout(e) {
    e.preventDefault();

    const res = await dispatch(logout());
    if(res?.payload?.success){
        navigate('/')
    }

}
  return (
    <nav className=" hidden lg:flex w-full absolute z-50">
      <div className=" bg-gray-700 p-1  fixed flex items-center w-full justify-between z-50">
        {/* Logo */}
        <div className="w-fit">
          <Link to="/" className="hover:bg-gray-600 p-1 text-white text-sm font-bold flex flex-col border border-gray-400 rounded-full items-center justify-center py-3">
            <span className="inline-block"><code>{`</codemon>`}</code></span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="w-full flex items-center justify-evenly">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300">
            Contact Us
          </Link>
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className=" m-1">Courses</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/courses" className="text-white">Software Engineering</Link></li>
              <li><Link to="/courses" className="text-white">Artificial Intelligence</Link></li>
              <li>
                {isLoggedIn && role === 'ADMIN' && (<Link to="/course/create" className="text-white">Create Course</Link>)}
              </li>
            </ul>
          </div>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search"
          className="w-20 xl:w-max p-1 rounded-md bg-gray-500 text-white focus:outline-none"
        />
        <div className="navbar-end w-fit">
    
          <button className="btn btn-ghost btn-circle w-full px-3">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>

        {/* Sign Up and Sign In Buttons */}
        {!isLoggedIn && (
            <div className=" flex flex-row items-center justify-end gap-x-3 w-6/12">
              <Link to={'/signup'}>
                 <button className="btn-primary px-2 py-1 rounded-lg">
                   Register
                 </button>
              </Link>
              <Link to={'/login'}>
                <button className="btn-secondary px-2 py-1 rounded-lg">
                  Login
                </button>
              </Link>
              
            </div>
            )}
        {isLoggedIn && (
          <div className=" flex flex-row items-center justify-end gap-x-3 w-6/12">
            <Link to={'/user/profile'}>
               <button className="btn-primary px-2 py-1 rounded-lg">
                 Profile
               </button>
            </Link>
            <button onClick={handleLogout} className="btn-secondary px-2 py-1 rounded-lg">
                Logout
            </button>
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
