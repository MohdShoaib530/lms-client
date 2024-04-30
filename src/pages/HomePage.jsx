import { Link } from "react-router-dom";

import HomePageImage from "../assets/Images/homepage.svg";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
  return (
    <HomeLayout>
      <div className="bg-[rgb(33, 33, 33)] lg:pt-10 pt-24 text-white flex lg:flex-row flex-col items-center justify-center px-5 min-h-screen w-full">
        <div className="w-full lg:w-1/2 space-y-4 flex flex-col justify-center lg:ml-8">
          <h1 className='text-yellow-500 lg:text-5xl text-3xl md:text-4xl font-semibold'>Coding Excellence Starts Here</h1>
          <h1 className=" lg:text-5xl text-3xl md:text-4xl font-semibold">
            Find out best
            <span className="px-2 text-yellow-500 lg:text-5xl text-3xl md:text-4xl font-semibold">
              Online Courses
            </span>
          </h1>
          <p className="text-xl text-gray-200">
            We have a large library of courses taught by highly skilled and
            qualified educators at a very affordable cost.
          </p>

          <div className="space-x-6 gap-3 flex flex-col md:flex-row">
            <Link to="/courses">
              <button className="btn border-yellow-600">Explore courses</button>
            </Link>

            <Link to="/contact">
              <button className="btn border-yellow-600">Contact Us</button>
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center">
          <img className='' alt="homepage image" src={HomePageImage} />
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
