import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
function HomeLayout({ children }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking if user is logged in 
    const isLoggedIn = useSelector((state) => (state?.auth?.isLoggedin));

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

        // const res = dispatch(logout());
        // if(res?.payload?.success){}

        navigate('/')
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
                        <div className="navbar bg-black lg:hidden flex items-center justify-between w-full">
                            <div className="navbar-center">
                                <a className="btn btn-ghost text-xl">Edu</a>
                            </div>
                            <div className="navbar-end">
                                <button className="btn btn-ghost btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                                <button className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                        <span className="badge badge-xs badge-primary indicator-item"></span>
                                    </div>
                                </button>
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
                        {isLoggedIn && role === "ADMIN" && (
                            <li>
                                <Link to={'/admin/dashboard'}>Admin Dashbord</Link>
                            </li>
                        )}

                        <li>
                            <Link to="/courses">All Courses</Link>
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
                                    <Link to={'/signin'}>Sign In</Link>
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
                                <button className='btn-secondary px-2 rounded-lg text-lg'>
                                    <Link onClick={handleLogout}>Logout</Link>
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