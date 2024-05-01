import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseById } from "../../Redux/Slices/LectureSlice";

function CourseDetails() {
  const { state } = useLocation();
  const { role, data } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function deleteCourse() {
    await dispatch(deleteCourseById(state._id));
    navigate("/courses");
  }
  return (
    <HomeLayout>
      <div className=" flex flex-col items-center justify-center text-white bg-gray-800 w-full  pt-24 mx-3 pb-16 px-3">
        <div className="flex lg:flex-row flex-col  gap-10  relative w-full sm:w-1/2 border border-gray-400 p-2 rounded-lg ">
          <div className="space-y-5 w-auto lg:w-2/6">
            <img
              src={state.thumbnail.secure_url}
              alt="thumbnail"
              className="w-full h-36 "
            />

            <div className="space-y-4 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-between text-xl">
                <h1 className="text-lg font-semibold text-white text-start">
                  No of Lectures:{" "}
                  <span className="text-yellow-500">
                    {state.numberOfLectures}
                  </span>
                </h1>

                <h1 className="text-lg font-semibold text-white">
                  Name of Instructor:{" "}
                  <span className="text-yellow-500">{state.createdBy}</span>
                </h1>
              </div>
              {role === "ADMIN" || data?.subscription?.status === "active" ? (
                <button
                  onClick={() =>
                    navigate(`/course/displaylectures`, { state: { ...state } })
                  }
                  className="btn btn-primary"
                >
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="btn btn-secondary"
                >
                  Checkout
                </button>
              )}
              {role === "ADMIN" && (
                <button
                  onClick={deleteCourse}
                  className=" btn-secondary px-3 py-2 rounded-lg"
                >
                  Delete Course
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2 text-xl w-auto flex flex-col items- justify-start lg:w-4/6">
            <h1 className="text-2xl font-bold text-yellow-500 mb-5 text-start underline">
              {state?.title}
            </h1>

            <p className="text-yellow-500 underline">Course description: </p>
            <p>{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDetails;
