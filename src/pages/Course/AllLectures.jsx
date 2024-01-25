import { useLocation } from "react-router-dom";

function AllLectues(){
    const {state} = useLocation()
    console.log('stae',state)
    return (
        <div>{state._id}</div>
    )
}

export default AllLectues;