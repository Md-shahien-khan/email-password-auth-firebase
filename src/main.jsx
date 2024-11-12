import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main.jsx';

import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Home from './Components/Home/Home.jsx';
import SignUp from './Components/Sign Up/SignUp.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,

    children : [
      {
        path : '/',
        element : <Home></Home>
      },
      {
        path : 'login',
        element : <Login></Login>
      },
      {
        path : 'register',
        element : <Register></Register>
      },
      {
        path : 'signUp',
        element : <SignUp></SignUp>
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
