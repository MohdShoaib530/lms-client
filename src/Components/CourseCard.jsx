function CourseCard({data}){

return (
        <div className="flex flex-col w-1/4  items-center justify-center text-center">
           <h1>{data?.title}</h1>
           <img src={data?.thumbnail?.secure_url} alt="lecture" />
           <h1>{data?.description}</h1>
           <p>{data?.category}</p>
           <p>{data?.numberOfLectures}</p>
           <p>{data.createdBy}</p>
        </div>
    )
}

export default CourseCard;