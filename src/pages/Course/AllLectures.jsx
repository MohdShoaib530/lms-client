import { useLocation } from "react-router-dom";

function AllLectues(){
    const {state} = useLocation()
    return (
        <div>{state._id}</div>
    )
}

export default AllLectues;