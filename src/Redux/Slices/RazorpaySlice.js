import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
};

export const getRazorpayKey = createAsyncThunk('razorpay/getRazorpayKey', async () => {
    try {
        const res = axiosInstance.get('/payments/razorpay-key');
        return (await res)?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const getRazorpaySubsId = createAsyncThunk('razorpay/getRazorpaySubsId', async () => {
    try {
        const res = axiosInstance.post('/payments/subscribe');
        return (await res)?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const paymentVerify = createAsyncThunk('/payment/verify', async (data) => {
    try {
        const res = axiosInstance.post('/payments/verify', {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });
        return (await res)?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});
export const cancelSubscription = createAsyncThunk('/subscription/cancel', async () => {
    try {
        const res = axiosInstance.post('/payments/unsubscribe');
        toast.promise(res, {
            loading: 'Cancelling Subscription...',
            success: (data) => {
                return data?.data?.message;
            },
            error: (err) => {
                return err?.response?.data?.message;
            }
        })
        return (await res)?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});


const rezorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorpayKey.fulfilled, (state,action) => {
            state.key = action?.payload?.key;
        })
        .addCase(getRazorpaySubsId.fulfilled, (state,action) => {
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(paymentVerify.fulfilled, (state, action) => {
            console.log(action);
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(paymentVerify.rejected, (state, action) => {
            console.log(action);
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        
    }
})

export default rezorpaySlice.reducer;
