import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        <div className="relative flex items-center justify-center flex-col bg-slate-400 pt-20 pb-8 w-full" >
            <form action=""noValidate onSubmit={createCourse} className=" flex flex-col justify-center gap-3 text-white rounded-lg  shadow-[0_0_10px] px-4 py-1 w-fit">
                <h3 className="text-2xl font-bold text-center">Create Course</h3>
                <label htmlFor="image_uploads" className="cursor-pointer">
                    {courseData.thumbnail ? (
                        <img src={courseData.previewImage} alt="" className="w-24 h-24 mx-auto rounded-full"/>
                    ) : (
                        <BsPersonCircle className="w-20 h-20 mx-auto border border-black p-1"/>
                    )}
                   <input onChange={getImage} type="file" name="image_uploads" id="image_uploads" className="hidden" accept=".jpg, .jpeg, .png, .svg"/>
                </label>


                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-semibold">Course Name</label>
                    <input value={courseData.title}  onChange={handleOnChange} type="text" required name="title" id="title" placeholder="Enter title.." className="bg-transparent px-2 py-1 border border-black" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="font-semibold">Description</label>
                    <input value={courseData.description} onChange={handleOnChange} type="text" required name="description" id="description" placeholder="Enter your description.." className="bg-transparent px-2 py-1 border border-black" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="font-semibold">category</label>
                    <input value={courseData.category} onChange={handleOnChange} type="text" required name="category" id="category" placeholder="Enter your category.." className="bg-transparent px-2 py-1 border border-black" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="createdBy" className="font-semibold">createdBy</label>
                    <input value={courseData.createdBy} onChange={handleOnChange} type="text" required name="createdBy" id="createdBy" placeholder="Enter  createdBy.." className="bg-transparent px-2 py-1 border border-black" />
                </div>
                <button  type="submit" className="hover:bg-yellow-600 w-full border border-yellow-500 bg-yellow-500 rounded-md py-2 font-semibold ">Create Account</button>
                
            </form>
        </div>
        </HomeLayout>
    )
}

export default CourseCreate;