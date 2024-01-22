import { useNavigate } from "react-router-dom";

function NotFound(){
    const navigate = useNavigate()
    return (
       <div className="flex flex-col items-center justify-center gap-2 w-full h-screen bg-gray-600">
        <div className="flex items-center justify-center w-full h-auto">
            <h1 className="text-7xl font-bold text-white tracking-widest">404</h1>
            <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
                 className="w-16 h-16  rotate-45 text-red-600"
               >
                <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth="2"
                   d="M12 4v16m8-8H4"
                 />
            </svg>
        </div>
            <h1 className="text-4xl">Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
       </div>
    )
}

export default NotFound;