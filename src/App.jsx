import './App.css';

import { Route, Routes } from 'react-router-dom';

import NotFoundPage from './Components/NotFound';
import AboutUs from './pages/AboutUs';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {

  return (
    <>
      <Routes>
         <Route path='/' element= {<HomePage/>}></Route>
         <Route path='/about' element= {<AboutUs/>}></Route>
         <Route path='/signup' element= {<SignUp/>}></Route>
         <Route path='/login' element= {<Login/>}></Route>
         <Route path='/*' element= {<NotFoundPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
