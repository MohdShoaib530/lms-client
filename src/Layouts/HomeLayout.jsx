import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { logout } from '../Redux/Slices/AuthSlice';
function HomeLayout({ children }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking if user is logged in 
    const isLoggedIn = useSelector((state) => (state?.auth?.isLoggedIn));

    //  for displaying options according to role of user
    const role = useSelector((state) => (state?.auth?.role));

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }

    function handleLogout(e) {
        e.preventDefault();

        const res = dispatch(logout());
        if(res?.payload?.success){
            navigate('/')
        }

    }

    return (
        <div className='relative'>
            <Navbar />
            <div className="drawer absolute left-0 z-50 w-full">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative flex items-center justify-between w-full">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"}
                            className=" font-bold text-white m-4 lg:hidden"
                        />
                        <div className="navbar bg-black hidden flex items-center justify-between w-full">
                            <div className="w-fit">
                               <Link to="/" className="hover:bg-gray-600 p-1 text-white text-sm font-bold flex flex-col border border-gray-400 rounded-full items-center justify-center py-3">
                                 <span className="inline-block"><code>{`</codemon>`}</code></span>
                               </Link>
                            </div>
                            
                        </div>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                    </label>
                    <ul className="menu min-h-full p-4 w-48 sm:w-80 bg-base-200 text-base-content">
                        <li className="w-fit text-white  z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {
                            isLoggedIn && role === 'ADMIN' && (
                                <Link to="/admin/dashboard" className="text-white">Admin Dashboard</Link>)
                        }

                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>
                        <li>
                        {
                            isLoggedIn && role === 'ADMIN' && (
                                <Link to="/course/create" className="text-white">Create Course</Link>)
                        }
                        </li>

                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>

                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        {!isLoggedIn && (
                            <div className='absolute bottom-3 w-full flex flex-row items-center gap-4'>
                                <button className='btn-primary px-3 rounded-lg text-lg'>
                                    <Link to={'/login'}>Login</Link>
                                </button>
                                <button className='btn-secondary px-2 rounded-lg text-lg'>
                                    <Link to={'/signup'}>Sign Up</Link>
                                </button>
                            </div>
                        )}
                        {isLoggedIn && (
                            <div className='absolute bottom-3 w-full flex flex-row items-center gap-4'>
                                <button className='btn-primary px-3 rounded-lg text-lg'>
                                    <Link to={'/user/profile'}>Profile</Link>
                                </button>
                                <button onClick={handleLogout} className='btn-secondary px-2 rounded-lg text-lg'>
                                   Logout
                                </button>
                            </div>
                        )}

                    </ul>
                </div>
            </div>

            {children}

            <Footer />
        </div>
    );
}

export default HomeLayout;