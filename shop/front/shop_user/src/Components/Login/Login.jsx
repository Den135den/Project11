import React, {  useState } from "react";
import style from "./Login.module.css"
import { Link } from "react-router-dom";
import VerifyLogin from "./VerifyLogin/VerifyLogin";
import { CheckRegisterToken } from "../Register/CheckRegisterToken";





function Login(){
   
 
    
    const [login, SetLogin] = useState(false)

    const [state, setState] = useState({
        username: '',
        login: '',
        email: '',
        password: '',
    })

    const [errorInput, errorInputState] = useState({
        username: '',
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errorLogin, SetErrorLogin] = useState(null)

   function onChangeForm(e){
    setState({...state, [e.target.name]: e.target.value});
    errorInputState({ ...errorInput, [e.target.name]: '' });
    SetErrorLogin(''); 
    errorInputState('')

}

    function onClickForm(e) {
    e.preventDefault()

    let objectError = {};

    if(!state.username){
        objectError.usernameError = 'The username is empty'
    }

    if(!state.login){
        objectError.loginError = 'The login is empty'
    }

    if(!state.email){
        objectError.emailError = 'The email is empty'
    }

    if(!state.password){
        objectError.passwordError = 'The username is empty'
    }

    if(Object.keys(objectError).length>0){
        errorInputState(objectError)
    }
    else{
        errorInputState({})
        
        fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: state.username,
            login: state.login,
            email: state.email,
            password: state.password,
        })
    })
    .then((response) => {
        if(response.status === 200){
         SetLogin(true)
        
        }
        return response.json()
    })
    .then((data) =>{ 
        console.log(data)
        if (data && data.access_token) {
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
        if (data && data.message) {
            SetErrorLogin(data.message); 
        } 
    })
    .catch(error => console.log(error));
    }
}





  return(

    <div className={style.animated__background}>
                <div> 
                    <div className={style.wave}></div>
                    <div className={style.wave}></div>
                    <div className={style.wave}></div>
                    <div className={style.button__backgroundContainer}>


                {login? <VerifyLogin/> :
                     <form className={style['login-form']}>
                     <div className={`${style.logo}`}>
                          <h1>LOGIN</h1>
                     </div>
                     <div className={style['flex-row']}>
                         <input id="Username" className={style['lf--input']} placeholder='Username' type='text'
                          name="username" value={state.username} onChange={onChangeForm}
                         />
                           {errorInput.usernameError && <div className={style.error}>{errorInput.usernameError}</div>}
                        
                     </div>

                     <div className={style['flex-row']}>
                         <input id="Login" className={style['lf--input']} placeholder='Login' type='login'
                          name="login" value={state.login} onChange={onChangeForm}
                         />
                           {errorInput.loginError && <div className={style.error}>{errorInput.loginError}</div>}
                        

                     </div>
                     <div className={style['flex-row']}>
                         <input id="Email" className={style['lf--input']} placeholder='Email' type='email'
                           name="email" value={state.email} onChange={onChangeForm}
                         />
                           {errorInput.emailError && <div className={style.error}>{errorInput.emailError}</div>}
                     </div>
                     <div className={style['flex-row']}>
                         <input id="Password" className={style['lf--input']} placeholder='Password' type='password'
                          name="password" value={state.password} onChange={onChangeForm}
                         />
                          {errorInput.passwordError && <div className={style.error}>{errorInput.passwordError}</div>}
                     </div>
                     {errorLogin && <div  className={style.errorIsUser}>{errorLogin}</div>}

                     <Link to='/forgotPassword'>Forgot you password</Link>
                    
                     <input className={style['lf--submit']} type='submit' onClick={onClickForm} value='Sign Up'/>
                     <div className={style['lf--forgot']}>Already throwing balls? <Link to='/register' className={style.logIn}>Register</Link></div>
                     </form> 
                }
            </div> 
                   
        </div>
    </div>

    
  )
}


export default Login;