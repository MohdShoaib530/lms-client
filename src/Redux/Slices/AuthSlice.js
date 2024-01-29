import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    role: JSON.parse(localStorage.getItem('role')) || "guest",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch(error) {
        if(error?.response){
            toast.error(error?.response?.data?.message);
        } else {
            toast.error(error?.message)   
        }
    }
})

export const loginAccount = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! Authenticating user... ",
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to login user'
        });
        return (await res)?.data;
    } catch(error) {
        if(error?.response){
            toast.error(error?.response?.data?.message);
        } else {
            toast.error(error?.message)   
        }
    }
})
export const editProfile = createAsyncThunk("/user/editprofile", async (data) => {
    try {
        const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! Updating user details... ",
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to update user details'
        });
        return (await res)?.data;
    } catch(error) {
        if(error?.response){
            toast.error(error?.response?.data?.message);
        } else {
            toast.error(error?.message)   
        }
    }
})
export const getUserById = createAsyncThunk("/user/me", async () => {
    try {
        const res = axiosInstance.get("user/me/");
        toast.promise(res, {
            loading: "Wait! getting user details... ",
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to get user details'
        });
        return (await res)?.data;
    } catch(error) {
        if(error?.response){
            toast.error(error?.response?.data?.message);
        } else {
            toast.error(error?.message)   
        }
    }
})

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.post("user/logout");
        toast.promise(res, {
            loading: "Wait! Logging out... ",
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to logout user'
        });
        return (await res)?.data;
    } catch(error) {
        if(error?.response){
            toast.error(error?.response?.data?.message);
        } else {
            toast.error(error?.message)   
        }
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginAccount.fulfilled, (state,action) => {
            if(action?.payload){
                state.isLoggedIn = action?.payload?.success ;
                localStorage.setItem('isLoggedIn',action?.payload?.success);
            }
            localStorage.setItem('data',JSON.stringify(action?.payload?.user));
            localStorage.setItem('role',JSON.stringify(action?.payload?.user?.role));
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(createAccount.fulfilled, (state,action) => {
            if(action?.payload){
                state.isLoggedIn = action?.payload?.success ;
                localStorage.setItem('isLoggedIn',action?.payload?.success);
            }
            localStorage.setItem('data',JSON.stringify(action?.payload?.user));
            localStorage.setItem('role',JSON.stringify(action?.payload?.user?.role));
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
            localStorage.clear();
            state.data = {};
            state.role = "guest";
        })
        .addCase(getUserById.fulfilled, (state,action) => {
            if(action?.payload){
                state.isLoggedIn = action?.payload?.success ;
                localStorage.setItem('isLoggedIn',action?.payload?.success);
            }
            localStorage.setItem('data',JSON.stringify(action?.payload?.user));
            localStorage.setItem('role',JSON.stringify(action?.payload?.user?.role));
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;