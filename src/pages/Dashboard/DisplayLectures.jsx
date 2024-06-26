import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteLecture, getLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const { lectures } = useSelector((state) => state?.lecture);
  const role = useSelector((state) => state?.auth?.data?.role);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    await dispatch(deleteLecture({ courseId: courseId, lectureId: lectureId }));
    await dispatch(getLectures(state._id));
  }

  useEffect(() => {
    dispatch(getLectures(state._id));
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-wihte mx-[5%] w-full">
        <div className="text-center text-2xl font-semibold text-yellow-500 mt-8">
          Course Name: {state?.title}
        </div>

        {lectures && lectures.length > 0 ? (
          <div className="flex justify-center gap-10 lg:gap-1 flex-col lg:flex-row">
            {/* left section for playing videos and displaying course details to admin */}
            <div className="space-y-5 p-2 rounded-lg w-11/12 lg:w-5/12 shadow-[0_0_10px_black]">
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                controls
                disablePictureInPicture
                controlsList="nodownload"
              ></video>
              <div>
                <h1>
                  <span className="text-yellow-500"> Title: </span>
                  <span className='text-gray-200'>{lectures && lectures[currentVideo]?.title}</span>
                </h1>
                <p>
                  <span className="text-yellow-500 line-clamp-4">
                    Description:{" "}
                  </span>
                  <span className='text-gray-200'>{lectures && lectures[currentVideo]?.description}</span>
                </p>
              </div>
            </div> 

            {/* right section for displaying list of lectres */}
            <ul className="lg:w-5/12 p-2 rounded-lg w-11/12 shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures list</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                  >
                    Add new lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li className="space-y-2 text-gray-200" key={lecture._id}>
                      <p
                        className="cursor-pointer"
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span> Lecture {idx + 1} : </span>
                        {lecture?.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            onLectureDelete(state?._id, lecture?._id)
                          }
                          className="btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                        >
                          Delete lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          role === "ADMIN" && (
            <button
              onClick={() =>
                navigate("/course/addlecture", { state: { ...state } })
              }
              className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
            >
              Add new lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
