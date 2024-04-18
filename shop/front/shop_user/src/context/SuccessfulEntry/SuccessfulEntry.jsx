import React, { useState } from "react";

const LoginSystem = React.createContext(); 


function SuccessfulEntry({children}){


  const [successfulLogin, SetSuccessfulLogin] = useState(false)

  const [register, SetRegister] = useState(false)

  const [dataUser, SetDataUser] = useState({})

  return(
        <LoginSystem.Provider value={{
        successfulLogin, SetSuccessfulLogin, 
        register, SetRegister,
        dataUser, SetDataUser
        }}>
        {children}
        </LoginSystem.Provider>
  )
}


export {SuccessfulEntry, LoginSystem};