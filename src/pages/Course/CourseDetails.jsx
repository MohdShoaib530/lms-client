import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from '../../Layouts/HomeLayout'

function CourseDetails(){

    const {state} = useLocation()
    const {role , data} = useSelector(state => state?.auth)
    const navigate = useNavigate()
    return(
        <HomeLayout>
            <div className=" flex flex-col items-center justify-center text-white bg-gray-800 w-full  pt-16 mx-auto pb-16">
            <div className="lg:grid grid-cols-2 flex flex-col  gap-10 py-10 relative w-1/2 border border-gray-400 p-2 rounded-lg">
                <div className="space-y-5 w-auto">
                    <img src={state.thumbnail.secure_url} 
                          alt="thumbnail" 
                          className="w-full h-36 " 
                    />

                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-between text-xl">
                            <h1 className="text-lg font-semibold text-white text-start">No of Lectures:      <span className="text-yellow-500">{state.numberOfLectures}</span>
                            </h1>

                            <h1 className="text-lg font-semibold text-white">Name of Instructor: <span className="text-yellow-500">{state.createdBy}</span>
                            </h1>
                        </div>
                        {
                          role === "ADMIN" || data?.subscription?.status === 'ACTIVE' ? (
                            <button onClick={() => navigate(`/course/displaylectures`,{state: {...state,}})} className="btn btn-primary">Watch Lectures</button>
                          ) : (
                            <button onClick={() => navigate('/checkout')} className="btn btn-secondary">Checkout</button>
                          )
                        }
                    </div>

                </div>
                <div className="space-y-2 text-xl w-auto flex flex-col items- justify-start">
                        <h1 className="text-2xl font-bold text-yellow-500 mb-5 text-start underline">
                            {state?.title}
                        </h1>

                        <p className="text-yellow-500 underline">Course description: </p>
                        <p>{state?.description}</p>
                </div>
            </div>
        </div>
        </HomeLayout>
    )
}

export default CourseDetails;