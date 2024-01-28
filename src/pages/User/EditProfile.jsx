import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import{ editProfile, getUserById} from '../../Redux/Slices/AuthSlice'

function EditProfile(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const id = useSelector((state) => state?.auth?.data?._id);


    const [data,setData] = useState({
        fullName:"",
        previewImage: "",
        avatar:null,
    })

    function handleOnChange(e){
        const {name,value} = e.target;
        setData({
            ...data,
            [name]:value,
        })
    }

    function previewImage(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }

    async function onFormSubmit(e){
        e.preventDefault();

        // if(!data.fullName || !data.avatar) {
        //     toast.error("All fields are mandatory");
        //     return;
        // }
        if(data.fullName && data.fullName.length < 5) {
            toast.error("Name cannot be of less than 5 characters");
            return;
        }

        const form = new FormData();
        form.append("fullName", data.fullName);
        form.append("avatar", data.avatar);

        await dispatch(editProfile([id,form]));
        await dispatch(getUserById());
        setData({
            fullName:"",
            thumbnail: "",
            avatar:null,
        })
        navigate('/user/profile');

    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl font-semibold">Edit profile</h1>
                    <label className="cursor-pointer" htmlFor="image_uploads">
                        {data.previewImage ? (
                            <img 
                                className="w-28 h-28 rounded-full m-auto"
                                src={data.previewImage}

                            />
                        ): (
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                        )}
                    </label>
                    <input 
                        onChange={previewImage}
                        className="hidden"
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .png, .svg, .jpeg"
                
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="text-lg font-semibold">Full Name</label>
                        <input
                            formNoValidate
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name"
                            className="bg-transparent px-2 py-1 border"
                            value={data.fullName}
                            onChange={handleOnChange}
                        
                        />
                    </div>
                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
                        Update profile
                    </button>
                    <Link to="/user/profile">
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                            <AiOutlineArrowLeft /> Go back to profile
                        </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    )
}

export default EditProfile;