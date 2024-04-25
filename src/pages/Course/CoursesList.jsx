import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";

import CourseCard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import  {getAllCourses } from "../../Redux/Slices/CourseSlice";

function AllCourses(){
    const dispatch = useDispatch();
    const {courseData} = useSelector((state) => state.course)

    async function fetchCourses(){
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <HomeLayout>
            <div className="flex flex-col w-full pt-16 text-center bg-gray-800 h-screen">
                <div>
                    <h1 className="text-xl md:text-3xl font-bold">Explore Our All Courses Created By <span className="text-yellow-700">Industry Experts</span></h1>
                    <h1 className="text-gray-500 text-2xl">Courses are well structured</h1>
                </div>
                <div className="flex flex-wrap w-full pt-5 px-16 gap-4 items-center justify-evenly">
                    {courseData?.map((course) => {
                       return <CourseCard data={course} key={course.id}/>   
                    })}
                </div>
            
            </div>
        </HomeLayout>
    )
}

export default AllCourses;