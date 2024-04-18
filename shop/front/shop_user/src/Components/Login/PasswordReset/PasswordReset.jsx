import React, { useEffect, useState } from "react";
import style from "./PasswordReset.module.css"
//import { CheckRegisterToken } from "../../Register/CheckRegisterToken";
import { useLocation, useNavigate } from 'react-router-dom';
import Login from "../Login";

function PasswordReset() {

  const location = useLocation();
  const navigate = useNavigate(); 

  const query = new URLSearchParams(location.search);
  const idToken = query.get('token');
  // console.log(idToken)

  const [resetPassword, SetResetPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword:''
  });

  const [errorPassword, SetErrorPassword] = useState({
    oldPasswordError: '',
    newPasswordError: '',
    confirmPasswordError: '',
    mismatch: '',
    match: '',
    message: ''
  });

  const [login, SetLogin] = useState(false)

  function onChangeResetPassword(e) {
    SetResetPassword({ ...resetPassword, [e.target.name]: e.target.value });
    SetErrorPassword({});
  }

  function SendData(e) {
    e.preventDefault();

    let objectError = {};

    if(!resetPassword.oldPassword){
      objectError.oldPasswordError = 'The field old password is empty';
    }
    else if(resetPassword.newPassword === resetPassword.oldPassword){
      objectError.match = 'The new password match the old';
    }

    if(!resetPassword.newPassword){
      objectError.newPasswordError = 'The field new password is empty';
    }

    if(!resetPassword.confirmNewPassword){
      objectError.confirmPasswordError = 'The field confirm new password is empty';
    }

    else if(resetPassword.newPassword !== resetPassword.confirmNewPassword){
      objectError.mismatch = 'The old password does not match the new';
    }

    if(Object.keys(objectError).length > 0){
      SetErrorPassword(objectError);
    }
    else {
      SetErrorPassword({});

      fetch('http://localhost:5000/resetPassword', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json' 
        },
        body: JSON.stringify({ 
          oldPassword: resetPassword.oldPassword,
          newPassword:  resetPassword.newPassword,
          confirmNewPassword: resetPassword.confirmNewPassword,
          token: idToken
        })
      })
      .then((response) =>{ 
       
        if(response.status === 200){
            SetLogin(true) 
        }
        return response.json()
    })
      .then((data) => {
        console.log(data);
        SetErrorPassword(data);
      })
      .catch((error) => console.log(error));
    }
  }

  useEffect(() => {
     
    if(login){
       navigate(<Login/>)
    }

  }, [login, navigate]);


  return (
    <>{login?(<Login/>): 
    <div className={style.animated__background}>
    <div> 
      <div className={style.wave}></div>
      <div className={style.wave}></div>
      <div className={style.wave}></div>
      <div className={style.button__backgroundContainer}>
        <form className={style['login-form']}>
          <div className={`${style.logo}`}>
            <h2 className={style.main__title}>Password Reset</h2>
          </div>

          <div className={style['flex-row']}>
            <input id="Password" className={style['lf--input']} placeholder='Old password' type='text' name="oldPassword"
                   value={resetPassword.oldPassword} onChange={onChangeResetPassword}/>

            {errorPassword.oldPasswordError && <div className={style.error}>{errorPassword.oldPasswordError}</div>}
            {errorPassword.match && <div className={style.error}>{errorPassword.match}</div>}

          </div>

          <div className={style['flex-row']}>
            <input id="Password" className={style['lf--input']} placeholder='New password' type='text' name="newPassword" 
                   value={resetPassword.newPassword} onChange={onChangeResetPassword}/>

            {errorPassword.newPasswordError && <div className={style.error}>{errorPassword.newPasswordError}</div>}
            {errorPassword.mismatch && <div className={style.error}>{errorPassword.mismatch}</div>}
            {errorPassword.match && <div className={style.error}>{errorPassword.match}</div>}

          </div>

          <div className={style['flex-row']}>
            <input id="Password" className={style['lf--input']} placeholder='Confirm password' type='text' name="confirmNewPassword" 
                   value={resetPassword.confirmNewPassword} onChange={onChangeResetPassword}/>

            {errorPassword.confirmPasswordError && <div className={style.error}>{errorPassword.confirmPasswordError}</div>}
            {errorPassword.mismatch && <div className={style.error}>{errorPassword.mismatch}</div>}

          </div>

          {errorPassword.message && <div className={style.error}>{errorPassword.message}</div>}
          <input className={style['lf--submit']} type='submit' onClick={SendData} value='Sign Up' />
        </form> 
      </div> 
    </div>
  </div>
    }
    </>
   
  );
}

export default PasswordReset;
