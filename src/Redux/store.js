import { configureStore } from "@reduxjs/toolkit";

import AuthSliceReducer from "./Slices/AuthSlice";
import CourseSliceReducer from "./Slices/CourseSlice";
import LectureSliceReducer from "./Slices/LectureSlice";
import RazorpaySliceReducer from "./Slices/RazorpaySlice";
import StatsSliceReducer from "./Slices/StatsSlice";

const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        course: CourseSliceReducer,
        razorpay: RazorpaySliceReducer,
        lecture: LectureSliceReducer,
        stats: StatsSliceReducer
    },
    devTools:true
});

export default store;   