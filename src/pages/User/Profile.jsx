import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserById } from "../../Redux/Slices/AuthSlice";
import { cancelSubscription } from "../../Redux/Slices/RazorpaySlice";

function Profile() {
  const userData = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CancleSubscription = async () => {
    await dispatch(cancelSubscription());
    await dispatch(getUserById());
    navigate("/user/profile");
  };
  const serverbusy = async () => {
    toast.error("Server Busy")
  }

  return (
    <HomeLayout>
      <div className="w-full bg-gray-800 min-h-[90vh] flex items-center justify-center ">
        <div className="w-full mx-5 sm:w-1/2 py-10 mt-20 flex flex-col gap-4 rounded-lg px-4 text-white border border-gray-950 shadow-2xl">
          <img
            src={userData?.data?.avatar?.secure_url}
            className="w-40 m-auto rounded-full border border-black"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.data?.fullName}
          </h3>
          <div className="grid ">
            <div className="grid grid-cols-2">
              <p>Email: </p>
              <p>{userData?.data?.email}</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Role: </p>
              <p>{userData?.role}</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Subscription: </p>
              <p>
                {userData?.data?.subscription?.status === "active"
                  ? "Action"
                  : "Inactive"}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <button className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            onClick={serverbusy}
            >
              Change password
            </button>
            <Link
              to="/user/editprofile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>Edit profile</button>
            </Link>
          </div>
          {userData?.data?.subscription?.status === "active" && (
            <button
              onClick={CancleSubscription}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              Cancel Subscription
            </button>
          )}
          {userData?.data?.role === "ADMIN" && (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="w-full btn-primary btn"
            >
              Admin Dashboard
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
