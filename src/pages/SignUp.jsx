import { useState } from "react";
import { toast } from "react-hot-toast";
import {BsPersonCircle} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isPassword } from "../Helpers/RegexMatcher";
import HomeLayout from "../layouts/HomeLayout";
import {createAccount } from '../Redux/Slices/AuthSlice'

function SignUp(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [previewIimage,setPreviewImage] =useState();

    const [signUpData,setSignUpData] = useState({
        fullName:'',
        email: '',
        password: '',
        avatar: '',
    })

    function handleUserInput(e) {
        const {name,value} = e.target;
        setSignUpData({
            ...signUpData, [name]:value
        })
    }

    function getImage(event){
        event.preventDefault();
        // getting the image
        const uploadedImage = event.target.files[0];

        if(uploadedImage){
            setSignUpData({
                ...signUpData,avatar:uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function(){
                setPreviewImage(this.result)
            })
        }
    }

    async function createNewAccount(event){
        event.preventDefault();

        if(!signUpData.avatar && !signUpData.fullName && !signUpData.email && !signUpData.password){
            return toast.error(`Please fill all the fields`);
        }

        if(signUpData.fullName.length < 3) {
           return toast.error(`Name must be atleast 3 characters`);
        }
        if(!isEmail(signUpData.email)) {
            return toast.error(`Please enter a valid email`);
            
        }
        if(!isPassword(signUpData.password)) {
            return toast.error(`password to be at least 8 characters long, one uppercase letter, one lowercase letter, and one digit.`);
        
        }
        
            const formData = new FormData();
            formData.append('fullName',signUpData.fullName);
            formData.append('email',signUpData.email);
            formData.append('password',signUpData.password);
            formData.append('avatar',signUpData.avatar);
        
            const response = await dispatch(createAccount(formData));
            console.log('res',response);
            if(response?.payload?.success){
                navigate('/');

            }
            
            
            setSignUpData({
                fullName:'',
                email: '',
                password: '',
                avatar: '',
            });
        
            setPreviewImage(null);
    }
    
    

    

    return (
        <HomeLayout>
        <div className="relative flex items-center justify-center flex-col bg-slate-400 pt-20 pb-8 w-full" >
            <form action=""noValidate onSubmit={createNewAccount} className=" flex flex-col justify-center gap-3 text-white rounded-lg  shadow-[0_0_10px] px-4 py-1 w-fit">
                <h3 className="text-2xl font-bold text-center">Register User</h3>
                <label htmlFor="image_uploads" className="cursor-pointer">
                    {previewIimage ? (
                        <img src={previewIimage} alt="" className="w-24 h-24 mx-auto rounded-full"/>
                    ) : (
                        <BsPersonCircle className="w-20 h-20 mx-auto border border-black p-1"/>
                    )}
                </label>

                <input onChange={getImage} type="file" name="image_uploads" id="image_uploads" className="hidden" accept=".jpg, .jpeg, .png, .svg"/>

                <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="font-semibold">Name</label>
                    <input value={signUpData.fullName}  onChange={handleUserInput} type="text" required name="fullName" id="fullName" placeholder="Enter your Name.." className="bg-transparent px-2 py-1 border border-black" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input value={signUpData.email} onChange={handleUserInput} type="email" required name="email" id="email" placeholder="Enter your email.." className="bg-transparent px-2 py-1 border border-black" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-semibold">Password</label>
                    <input value={signUpData.password} onChange={handleUserInput} type="password" required name="password" id="password" placeholder="Enter your password.." className="bg-transparent px-2 py-1 border border-black" />
                </div>
                <button  type="submit" className="hover:bg-yellow-600 w-full border border-yellow-500 bg-yellow-500 rounded-md py-2 font-semibold ">Create Account</button>
                <p>
                    Already have an account ? <Link to={'/login'} className="link text-accent">Login</Link>
                </p>
            </form>
        </div>
        </HomeLayout>
    )
}

export default SignUp;