import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    lectures: [],
};

export const getLectures = createAsyncThunk('/course/lectures', async (courseId) => {
    try {
        const res = axiosInstance.get(`/courses/${courseId}`);
        toast.promise(res, {
        loading:"lectures loading ....",
        success: 'Course lectures fetched successfully',
        error: "Something went wrong !"

        });
           return (await res)?.data;

    } catch (error) {
        toast.error(error?.response?.data.message)
    }
})

export const deleteLecture = createAsyncThunk('/courses/lectures/delete', async (data) => {
      
    try {
        const res = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(res, {
        loading:"Deleting lecture ....",
        success: 'lecture deleted successfully',
        error: "Something went wrong !"

        });
           return (await res)?.data;

    } catch (error) {
        toast.error(error?.response?.data.message)
    }
})

export const addNewLecture = createAsyncThunk('/courses/lectures/add', async (data) => {
    try {

        const formdata = new FormData();
        formdata.append("title",data.title)
        formdata.append("description",data.description)
        formdata.append("lecture",data.lecture)

        const res = axiosInstance.post(`/courses/${data.id}`,formdata);
        toast.promise(res, {
        loading:"Uploading lecture ....",
        success: 'lecture uploaded successfully',
        error: "Something went wrong !"

        });
           return (await res)?.data;

    } catch (error) {
        toast.error(error?.response?.data.message)
    }
})

export const deleteCourseById = createAsyncThunk('/courses/lectures/add', async (id) => {
    try {
        const res = axiosInstance.delete(`/courses/${id}`);
        toast.promise(res, {
        loading:"deleting course ....",
        success: 'course deleted successfully',
        error: "Something went wrong !"

        });
           return (await res)?.data;

    } catch (error) {
        toast.error(error?.response?.data.message)
    }
})

const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getLectures.fulfilled, (state,action) => {
            state.lectures = action?.payload?.lectures
        })
        .addCase(addNewLecture.fulfilled, (state,action) => {
            state.lectures = action?.payload?.course?.lectures
        })
    }
})

export default lectureSlice.reducer;