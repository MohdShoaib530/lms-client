import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: [] 
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const res = axiosInstance.get("/courses");
        toast.promise(res, {
            loading: "Wait! Fectching courses ....",
            success: "courses fetched successfully",
            error: "Failed to fetch courses"
        });
        return (await res).data.courses;
    } catch(error) {
        if(error?.response){
            toast.error(error?.response?.data?.message);
        } else {
            toast.error(error?.message)   
        }
    }
})


const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllCourses.fulfilled, (state,action) => {
            if(action.payload){
                state.courseData = [...action.payload]
            }
        })

    }
})

export default courseSlice.reducer;