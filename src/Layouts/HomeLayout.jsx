import {AiFillCloseCircle} from 'react-icons/ai';
import {FiMenu} from 'react-icons/fi';
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
        <div>
            <Navbar/>
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu 
                            onClick={changeWidth}
                            size={"32px"}
                            className="font-bold text-white m-4 lg:hidden"
                        />
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
                                    <Link to={'/signin'}>SignIn</Link>
                                </button>
                                <button className='btn-secondary px-2 rounded-lg text-lg'>
                                    <Link to={'/signup'}>SingUp</Link>
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

            { children }

            <Footer />
        </div>
    );
}

export default HomeLayout;