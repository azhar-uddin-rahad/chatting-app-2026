import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Home from './Pages/Home'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import { ToastContainer, toast } from 'react-toastify';
import ForgetPassword from './Pages/ForgetPassword'
let router= createBrowserRouter( createRoutesFromElements(
  <Route>
    <Route path='/' element={<Login></Login>}></Route>
    <Route path='/sign_up' element={<Registration></Registration>}></Route>
    <Route path='/forget-password' element={<ForgetPassword></ForgetPassword>}></Route>
    <Route path='/home' element={<Home></Home>}></Route>
  </Route>
))

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
    
  )
}

export default App
