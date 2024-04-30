import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { editProfile, getUserById } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state?.auth?.data?._id);

  const [data, setData] = useState({
    fullName: "",
    previewImage: "",
    avatar: null,
  });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function previewImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!data.fullName && !data.avatar) {
      toast.error("Please fill any of the fields to update");
      return;
    }
    if (data.fullName && data.fullName.length < 5) {
      toast.error("Name cannot be of less than 5 characters");
      return;
    }

    const form = new FormData();
    form.append("fullName", data.fullName);
    form.append("avatar", data.avatar);

    await dispatch(editProfile([id, form]));
    await dispatch(getUserById());
    setData({
      fullName: "",
      thumbnail: "",
      avatar: null,
    });
    navigate("/user/profile");
  }

  return (
    <HomeLayout>
      <div className="bg-[rgb(33, 33, 33)] w-full mx-auto h-screen flex flex-col items-center  gap-y-3 pt-24">
        <form
          onSubmit={onFormSubmit}
          className="bg-gray-700 w-fit px-3 py-4 rounded-lg border border-gray-300  flex flex-col items-center justify-center"
        >
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <h1 className="text-yellow-600 font-semibold text-2xl mt-4">
              Edit Profile
            </h1>
            <label htmlFor="image">
              <div className="flex items-center justify-center">
                {data.previewImage ? (
                  <img
                    src={data.previewImage}
                    alt=""
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <BsPersonCircle className="w-24 h-24" />
                )}
              </div>
              <input
                onChange={previewImage}
                type="file"
                className="hidden"
                id="image"
              />
            </label>
          </div>
          <div className="pb-4">
            <p className="font-semibold pt-3 pb-1">Enter your name</p>
            <input
              name="fullName"
              placeholder="Enter your name here"
              value={data.fullName}
              onChange={handleOnChange}
              type="text"
              className="rounded text-xl p-1 outline-none "
            />
          </div>
          <div className="flex flex-row items-center justify-center w-2/3 gap-2">
            <button type="submit" className="btn-primary btn ">
              Change <br /> Password
            </button>
            <button type="submit" className="btn-secondary btn ">
              Edit Profile
            </button>
          </div>
          <div className="flex flex-row items-center justify-center text-green-600 mt-3">
            <Link
              to={"/user/profile"}
              className="flex flex-row items-center justify-center gap-2"
            >
              <AiOutlineArrowLeft />
              <button>Go back to profile</button>
            </Link>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
