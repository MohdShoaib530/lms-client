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
            <div className="flex flex-row flex-wrap basis-1/4 w-full p-4 ">
                {courseData?.map((course) => {
                   return <CourseCard data={course} key={course.id}/>   
                })}
            
            </div>
        </HomeLayout>
    )
}

export default AllCourses;