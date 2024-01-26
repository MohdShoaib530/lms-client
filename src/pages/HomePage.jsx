import { Link } from "react-router-dom";

import HomePageImage from "../assets/Images/homePageMainImage.png";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
    return (
        <HomeLayout>
            <div className="pt-20 text-white flex flex-wrap items-center justify-center mx-5 mb-10 ">
                  <div className="lg:w-1/2 space-y-6">
                    <h1 className=" text-5xl font-semibold">
                        Find out best 
                        <span className="px-2  text-yellow-500 font-bold">
                            Online Courses
                        </span>
                    </h1>
                    <p className="text-xl text-gray-200">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>
                    
                    <div className="space-x-6 gap-3 flex flex-col md:flex-row">
                        <Link to="/courses">
                            <button className="btn border-yellow-600">
                                Explore courses
                            </button>
                        </Link>

                        <Link to="/contact">
                            <button className="btn border-yellow-600">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                  </div>

                  <div className="lg:w-1/2 flex items-center justify-center">
                    <img alt="homepage image" src={HomePageImage} />
                  </div>

            </div>
        </HomeLayout>
    );
}

export default HomePage;