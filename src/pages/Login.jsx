/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import { loginAccount } from "../Redux/Slices/AuthSlice";

function Login(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginData,setLoginData] = useState({
        email: '',
        password: ''
    })

    function handleUserInput(e) {
        const {name,value} = e.target;
        setLoginData({
            ...loginData, [name]:value
        })
    }

    async function onLogin(event){
        event.preventDefault();

        if(!loginData.email || !loginData.password){
            toast.error(`Please fill all the fields`);
             return
        }
        
        const response = await dispatch(loginAccount(loginData));
        console.log('res',response);
        if(response?.payload?.success){
            navigate('/');
        }
            
            
            setLoginData({
                email: '',
                password: ''
            });
    }
    
    

    

    return (
        <HomeLayout>
        <div className="relative flex items-center justify-center flex-col bg-slate-400 pt-20 pb-8 w-full" >
            <form noValidate onSubmit={onLogin} className=" flex flex-col justify-center gap-3 text-white rounded-lg  shadow-[0_0_10px] px-4 py-1 w-fit">
                <h3 className="text-2xl font-bold text-center">Registration Form</h3>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input value={loginData.email} onChange={handleUserInput} type="email" required name="email" id="email" placeholder="Enter your email.." className="bg-transparent px-2 py-1 border border-black" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-semibold">Email</label>
                    <input value={loginData.password} onChange={handleUserInput} type="password" required name="password" id="password" placeholder="Enter your password.." className="bg-transparent px-2 py-1 border border-black" />
                </div>
                <button  type="submit" className="hover:bg-yellow-600 w-full border border-yellow-500 bg-yellow-500 rounded-md py-2 font-semibold ">Login</button>
                <p>
                    Dont have an account ? <Link to={'/signup'} className="link text-accent">Sign Up</Link>
                </p>
            </form>
        </div>
        </HomeLayout>
    )
}

export default Login;