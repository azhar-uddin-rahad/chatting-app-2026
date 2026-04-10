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

let router= createBrowserRouter( createRoutesFromElements(
  <Route>
    <Route path='/' element={<Login></Login>}></Route>
    <Route path='/sign_up' element={<Registration></Registration>}></Route>
  </Route>
))

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
    
  )
}

export default App
