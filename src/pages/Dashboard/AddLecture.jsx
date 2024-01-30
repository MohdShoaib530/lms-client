import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import HomeLayout from '../../Layouts/HomeLayout';
import { addNewLecture} from "../../Redux/Slices/LectureSlice";

function AddNewLecture(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const {state} = useLocation();

    const [lectureData, setLectureData] = useState({
        title: "",
        description: "",
        lecture: null,
        id:state._id,
        previewVideo:''

    })

    function handleOnChange(e){
        const {name,value} = e.target
        setLectureData((prev) => (
            {
                ...prev,[name]:value
            }
        ))
    }

    function getVideo(e) {
        e.preventDefault();
    
        const uploadedVideo = e.target.files[0];
        
        if (uploadedVideo) {
            const fileReader = new FileReader();
    
            fileReader.readAsDataURL(uploadedVideo);
    
            fileReader.addEventListener("load", function () {
                setLectureData({
                    ...lectureData,
                    previewVideo: this.result,
                    lecture: uploadedVideo
                });
            });
        }
    }
    

    async function addLecture(e){
        e.preventDefault();

        if(!lectureData.title || !lectureData.description || !lectureData.lecture) {
            toast.error("All fields are mandatory");
            return;
        }
        

        const response = await dispatch(addNewLecture(lectureData));
        if(response?.payload?.success) {
            setLectureData({
                title: "",
                description: "",
                lecture: null,
                id:state._id,
                previewVideo:''

            });
            navigate('/course/displaylectures', {state: {...state}});
        }

    }
    return(
        <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
                <form
                    onSubmit={addLecture}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
                >
                    <p onClick={() => navigate(`/course/description`,{state:{...state}})} className="absolute top-8 text-2xl link text-accent cursor-pointer"><AiOutlineArrowLeft /></p>
                    <h1 className="text-center text-2xl font-bold">
                        Add New Lecture
                    </h1>

                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="video_uploads" className="cursor-pointer">
                                    {lectureData.previewVideo ? (
                                        <video src={lectureData.previewVideo} className="w-60 h-60 m-auto border" controls>
                                        </video>
                                        
                                    ): (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg"> upload video</h1>
                                        </div>
                                    )}

                                </label>
                                <input 
                                    className="hidden"
                                    type="file"
                                    id="video_uploads"
                                    accept=".mp4, .avi, .mov, .mkv, .wmv"
                                    name="video_uploads"
                                    onChange={getVideo}
                                />

                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="title">
                                    lecture title
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter course title"
                                    className="bg-transparent px-2 py-1 border"
                                    value={lectureData.title}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="description">
                                    lecture description
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Enter course description"
                                    className=" bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                                    value={lectureData.description}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                    </main>

                    <button type="submit" className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                        Add Lecture
                    </button>


                </form>
            </div>
        </HomeLayout>
    )
}

export default AddNewLecture;