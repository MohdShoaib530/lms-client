import { useNavigate } from "react-router-dom";


function CourseCard({data}){
    
    const navigate = useNavigate();

return (
           <div onClick={() => navigate('/course/description/',{state: {...data}})} className="w-40% lg:w-[32%] flex flex-col text-left border border-gray-500 rounded-lg p-3 bg-gray-900">
               <h1 className="font-semibold text-2xl mb-1 text-center">{data?.title}</h1>
               <img src={data?.thumbnail?.secure_url} alt="lecture" className="w-auto" />
               <div className="text-center">
                  <span className="font-semibold underline text-yellow-600">Description :</span>
                  <h1 className="">{data?.description}</h1>
               </div>
               <div className="md:flex flex flex-col gap-2 text-left">
                   <span className="underline font-semibold text-yellow-600">Category :</span>
                   <p>{data?.category}</p>
               </div>
               <div className="md:flex flex flex-col gap-2 text-left">
                   <span className="underline font-semibold text-yellow-600">No. of lecture :</span>
                   <p>{data?.numberOfLectures}</p>
               </div>
               <div className="md:flex flex flex-col gap-2 text-left">
                    <span className="underline font-semibold text-yellow-600">Created By :</span>
                    <p >{data.createdBy}</p>
               </div>
               </div>
    )
}

export default CourseCard;