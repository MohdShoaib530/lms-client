import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from '../../Layouts/HomeLayout'
import { createNewCourse } from "../../Redux/Slices/CourseSlice";


function CourseCreate(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        category:"",
        createdBy: "",
        thumbnail: null,
        previewImage: ""

    })

    function handleOnChange(e){
        const {name,value} = e.target
        setCourseData((prev) => (
            {
                ...prev,[name]:value
            }
        ))
    }

    function getImage(e){
        e.preventDefault();

        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            const fileReader = new FileReader;
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function (){
                setCourseData({
                    ...courseData,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                })
            })
        }

    }

    async function createCourse(e){
        e.preventDefault();

        if(!courseData.title || !courseData.description || !courseData.category || !courseData.thumbnail || !courseData.createdBy) {
            toast.error("All fields are mandatory");
            return;
        }

        const response = await dispatch(createNewCourse(courseData));
        console.log('res',response);
        if(response?.payload?.success) {
            setCourseData({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: ""
            });
            navigate("/courses");
        }

    }


    return (
        <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
                <form
                    onSubmit={createCourse}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
                >
                    
                    <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1 className="text-center text-2xl font-bold">
                        Create New Course
                    </h1>

                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                    {courseData.previewImage ? (
                                        <img 
                                            className="w-full h-44 m-auto border"
                                            src={courseData.previewImage}
                                        />
                                    ): (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                                        </div>
                                    )}

                                </label>
                                <input 
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    accept=".jpg, .jpeg, .png"
                                    name="image_uploads"
                                    onChange={getImage}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="title">
                                    Course title
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter course title"
                                    className="bg-transparent px-2 py-1 border"
                                    value={courseData.title}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="createdBy">
                                    Course Instructor
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter course instructor"
                                    className="bg-transparent px-2 py-1 border"
                                    value={courseData.createdBy}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="category">
                                    Course category
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Enter course category"
                                    className="bg-transparent px-2 py-1 border"
                                    value={courseData.category}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="description">
                                    Course description
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Enter course description"
                                    className=" bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                                    value={courseData.description}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                    </main>

                    <button type="submit" className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                        Create Course
                    </button>


                </form>
            </div>
        </HomeLayout>
    )
}

export default CourseCreate;