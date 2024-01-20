import './App.css';

import { Route, Routes } from 'react-router-dom';

import AboutUs from './pages/AboutUs';
import HomePage from './pages/HomePage';

function App() {

  return (
    <>
      <Routes>
         <Route path='/' element= {<HomePage/>}></Route>
         <Route path='/about' element= {<AboutUs/>}></Route>
      </Routes>
    </>
  )
}

export default App
