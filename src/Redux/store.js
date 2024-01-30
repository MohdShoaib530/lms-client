import { configureStore } from "@reduxjs/toolkit";

import AuthSliceReducer from "./Slices/AuthSlice";
import CourseSliceReducer from "./Slices/CourseSlice";
import LectureSliceReducer from "./Slices/LectureSlice";
import RazorpaySliceReducer from "./Slices/RazorpaySlice";

const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        course: CourseSliceReducer,
        razorpay: RazorpaySliceReducer,
        lecture: LectureSliceReducer
    },
    devTools:true
});

export default store;   