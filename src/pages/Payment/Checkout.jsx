import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from '../../Layouts/HomeLayout';
import { getRazorpayKey, getRazorpaySubsId, paymentVerify } from "../../Redux/Slices/RazorpaySlice";

function Checkout(){
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector(state => state?.razorpay?.key)
    const subscription_id = useSelector(state => state?.razorpay?.subscription_id);
    // const email = useSelector(state => state?.auth?.data?.email);


    async function handleSubscription(e){
        e.preventDefault();
        if(!razorpayKey || !subscription_id){
            toast.error("Something went wrong")
        }
        const options = {
            key:razorpayKey,
            subscription_id: subscription_id,
            name: "codemon pvt. ltd.",
            description: "Subscription",
            // prefill: {
            //     email: email,
            //     contact:" 9999999999",
            // },
            theme: {
                color: "#3399cc"
            },
            handler: async function (resp){
                try {
                    const response = await resp;
            
                    paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                    paymentDetails.razorpay_signature = response.razorpay_signature;
                    paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
            
                    toast.success("payment successful");
            
                    const res = await dispatch(paymentVerify(paymentDetails));
            
                    if (res?.payload?.success) {
                      navigate("/checkout/success");
                    } else {
                      navigate("/checkout/failure");
                    }
                } catch (error) {
                    navigate("/checkout/failure");
                }

            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    }

    async function load(){
       await dispatch(getRazorpayKey());
       await dispatch(getRazorpaySubsId())
    }

    useEffect(() => {
        load()
    },[])
    
    return(
        <HomeLayout>
            <form
                onSubmit={handleSubscription}
                className="min-h-[90vh] flex lg:mt-16 items-center justify-center text-white "
            >
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl0lg rounded-tr-lg">Subscription Bundle</h1>
                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px]">
                            This purchase will allow you to access all available course
                            of our platform for {" "} 
                            <span className="text-yellow-500 font-bold">
                                <br />
                                1 Year duration
                            </span> { " " }
                            All the existing and new launched courses will be also available
                        </p>

                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee /><span>499</span> only
                        </p>
                        <div className="text-gray-200">
                            <p>100% refund on cancellation</p>
                            <p>* Terms and conditions applied *</p>
                        </div>
                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
                            Buy now
                        </button>
                    </div>
                </div>

            </form>
        </HomeLayout>
    )
}

export default Checkout;