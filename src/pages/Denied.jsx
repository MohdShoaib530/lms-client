import { useNavigate } from "react-router-dom";


function Denied(){
    const navigate = useNavigate();
    return (
        <main className="flex flex-col items-center justify-center w-full h-screen">
            <h1 className="text-9xl text-white items-center justify-center font-extrabold">
                403
            </h1>
            <div className="bg-black absolute rotate-12 text-red-700">
                Access denied
            </div>
            <button onClick={() => navigate("/")} className="btn btn-secondary">
                Go Back
            </button>
        </main>
    )
}

export default Denied;