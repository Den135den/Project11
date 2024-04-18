import React, { useState } from "react";
import style from "./ForgotPassword.module.css"
import { CheckRegisterToken } from "../../Register/CheckRegisterToken";
import logo from '../img/logo.svg'



function ForgotPassword(){
   
    const [forgotPassword, SetForgotPassword] = useState({email:''})

    const [errorEmail, SetErrorEmail] = useState({})

    const [errorMessage, SetErrorMessage] = useState(false)

    const [showModal, SetShowModal] = useState(false)

    function onChangeForgotPassword(e){
        SetForgotPassword({...forgotPassword, [e.target.name]: e.target.value})
    }

   function SendData(e) {
    e.preventDefault()

    let objectError = {}

    if(!forgotPassword.email){
      objectError.email = 'The field is empty'
    }

    if(Object.keys(objectError).length>0){
         SetErrorEmail(objectError)
    }
    else{
      SetErrorEmail({})
    
      fetch('http://localhost:5000/forgotPassword',{
          
       method: 'POST',
       headers: {
        'Content-type': 'application/json' 
      },
       body: JSON.stringify({ email: forgotPassword.email})
       
      })
      .then((response)=>{
        if(response.status === 200){
          SetShowModal(true)
        }
        if(response.status === 403){
            SetErrorMessage(response)
        }
        return response.json()
      })
      .then((data)=> {
         console.log(data)
        if ( data.access_token) {
        
          let token = data.access_token;
    
          CheckRegisterToken(token);
    
      
          let authToken = localStorage.getItem('authToken');
      
          fetch('http://localhost:5000/verifyToken', {
              method: 'POST',
              headers: authToken ? {
                  'Authorization': `Bearer ${authToken}`,
                  'Content-Type': 'application/json',
              } : {
                  'Content-Type': 'application/json',
              }
          })
          .then((response) => response.json())
          .then((result) => console.log(result.message))
          .catch((error) => console.log(error));
      }
      })
    .catch((error)=>console.log(error))
    }
      

}



  return(

    <div className={style.animated__background}>
      {showModal?  (
        <div className={style["modal"]}>
          <div className={style["modal-content"]}>
            <span className={style["close"]} onClick={() => SetShowModal(false)}>
              &times;
            </span>
            <h2 className={style["modal-size"]}><img src={logo} width={'17px'} className={style["modal-logo"]} alt="logo"/>Для зміни пароля перейдіть до вказаної почти та перейдіть за посиланням, яке знаходиться там.</h2>
          </div>
        </div>
      ) :(
                <div> 
                    <div className={style.wave}></div>
                    <div className={style.wave}></div>
                    <div className={style.wave}></div>
                    <div className={style.button__backgroundContainer}>


                     <form className={style['login-form']}>
                     <div className={`${style.logo}`}>
                          <h2 className={style.main__title}>Forgot Password</h2>
                     </div>
                     <div className={style['flex-row']}>
                     <input id="Email" className={style['lf--input']} placeholder='Email'type='text'name="email" value={forgotPassword.email} 
                     onChange={onChangeForgotPassword}/>
                          
                     {errorEmail && <div className={style.error}>{errorEmail.email}</div>}

                     {errorMessage && <div className={style.error}>User with this email does not exist</div>}
                     </div>

                    
                    
                     <input className={style['lf--submit']} type='submit' onClick={SendData} value='Sign Up' />
                     
                     </form> 
                
            </div> 
          </div>
      )}          
    </div>

    
  )
}


export default ForgotPassword;