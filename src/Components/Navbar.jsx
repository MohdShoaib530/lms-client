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
      <div className=" bg-gray-700 p-3  fixed flex items-center w-full justify-between z-50">
        {/* Logo */}
        <div className="w-fit">
          <Link to="/" className="">
            <span className="inline-block"><code>{`</code>`}</code></span>
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
