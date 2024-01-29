import './App.css';

import { Route, Routes } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
import NotFoundPage from './Components/NotFound';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import AllLectues from './pages/Course/AllLectures';
import CourseCreate from './pages/Course/CourseCreate';
import CourseDetails from './pages/Course/CourseDetails';
import AllCourses from './pages/Course/CoursesList';
import Denied from './pages/Denied';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Checkout from './pages/Payment/Checkout';
import CheckoutSuccess from './pages/Payment/CheckoutSuccess';
import SignUp from './pages/SignUp';
import EditProfile from './pages/User/EditProfile';
import Profile from './pages/User/Profile';

function App() {

  return (
    <>
      <Routes>
         <Route path='/' element= {<HomePage/>}></Route>
         <Route path='/signup' element= {<SignUp/>}></Route>
         <Route path='/login' element= {<Login/>}></Route>
         <Route path='/courses' element= {<AllCourses/>}></Route>
         <Route path='/course/description' element= {<CourseDetails/>}></Route>
         <Route path='/course/displaylectures' element= {<AllLectues/>}></Route>
         <Route path='/about' element= {<AboutUs/>}></Route>
         <Route path='/contact' element= {<ContactUs/>}></Route>
         <Route path='/denied' element= {<Denied/>}></Route>
         <Route path='/*' element= {<NotFoundPage/>}></Route>

         <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>} >
             <Route path='/course/create' element={<CourseCreate/>}></Route>
         </Route>
         <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]}/>} >
            <Route path='/user/profile' element= {<Profile/>}></Route>
            <Route path='/user/editprofile' element= {<EditProfile/>}></Route>
         </Route>

         <Route element={<RequireAuth allowedRoles={["USER"]}/>} >
            <Route path='/checkout' element= {<Checkout/>}></Route>
            <Route path='/checkout/success' element= {<CheckoutSuccess/>}></Route>
         </Route>
      </Routes>
    </>
  )
}

export default App
