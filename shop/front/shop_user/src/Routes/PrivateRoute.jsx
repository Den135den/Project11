import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CheckRegisterToken, CheckRegisterCode } from "../Components/Register/CheckRegisterToken";


function PrivateRoute(){


const LoginIs = CheckRegisterToken();

const Code = CheckRegisterCode();

  return(

    <div>
        {LoginIs && Code? <Outlet/> : <Navigate to={'/home'}/>}
    </div>
  )
}


export default PrivateRoute;
