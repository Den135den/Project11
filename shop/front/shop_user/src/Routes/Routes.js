import Main from "../Components/Main/Main";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import ForgotPassword from "../Components/Login/ForgotPassword/ForgotPassword";
import PasswordReset from "../Components/Login/PasswordReset/PasswordReset";



export const RouteUser = [
    {
        id:1,
        path:'/',
        component:<Main/>
    },
    {
        id:2,
        path:'/register',
        component:<Register/>
    },
    {
        id:3,
        path:'/login',
        component:<Login/>
    },
    {
        id: 4,
        path: '/forgotPassword',
        component: <ForgotPassword/>
    },
    {
        id: 5,
        path: '/resetPassword',
        component: <PasswordReset/>
    }
 
]


export const LinkUser = [
    {
       
    }
]