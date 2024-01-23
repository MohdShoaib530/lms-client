import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" hidden lg:flex w-full absolute z-50">
      <div className=" bg-gray-700 p-1  fixed flex items-center w-full justify-between z-50">
        {/* Logo */}
        <div className="w-fit">
          <Link to="/" className="text-white text-xl font-bold">
            <div className="avatar online placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-12">
                <span className="text-xl">Edu</span>
              </div>
            </div>
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
          <Link to="/courses" className="text-white hover:text-gray-300">
            Courses
          </Link>
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
        <div className=" flex flex-row items-center justify-end gap-x-3 w-6/12">
          <Link to={'/signup'}>
             <button className="btn-primary px-2 py-1 rounded-lg">
               Sign Up
             </button>
          </Link>
          <Link to={'/login'}>
            <button className="btn-secondary px-2 py-1 rounded-lg">
              Login
            </button>
          </Link>
          
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
