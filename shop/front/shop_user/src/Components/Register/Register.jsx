import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Register.module.css";
import { CheckRegisterToken } from "./CheckRegisterToken";
import { LoginSystem } from "../../context/SuccessfulEntry/SuccessfulEntry";
import VerifyRegister from './VerifyRegister/VerifyRegister'


function Register() {
    const [state, setState] = useState({
        username: '',
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errorInput, errorInputState] = useState({
        username: '',
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

  

    const {register, SetRegister} = useContext(LoginSystem)
    
    const[isUser, SetIsUser] = useState(false);

       const [errorUser, SetErrorUser] = useState({})
    

    function onClickRegister(e) {
        e.preventDefault();
      const objectError = {}

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
        objectError.passwordError = 'The password is empty'
      }
      if(!state.confirmPassword){
        objectError.confirmPasswordError = 'The confirm password is empty'
      }

      if(state.password !== state.confirmPassword){
        objectError.passwordMatch = 'Password do not match'
      }


      if(Object.keys(objectError).length>0){
        errorInputState(objectError)
      }
      else{
        errorInputState({})
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: state.username,
                login: state.login,
                email: state.email,
                password: state.password,
                confirmPassword: state.confirmPassword
            })
        })
        .then((response) => {
            if (response.status === 200) {
                SetRegister(true)
                SetIsUser(false)
            } 
            
             else {
                SetIsUser(true)
            }
            return response.json(); 
        })
        .then((data) => {
            console.log(data);
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
            if (data.length > 0) {
                const errors = {};
                for (let i = 0; i < data.length; i++) {
                    for (let key in data[i]) {
                        errors[key] = data[i][key];
                    }
                }
                SetErrorUser(errors);
            }
        })
        .catch(error => console.log(error));
    }
}

        

    function onChangeForm(e) {
        setState({ ...state, [e.target.name]: e.target.value });
        errorInputState({ ...errorInput, [e.target.name]: '' });
        SetIsUser('')
        errorInputState('')
        SetErrorUser('')
    }


    return (
        <div className={style.animated__background}>
            <div>
                <div className={style.wave}></div>
                <div className={style.wave}></div>
                <div className={style.wave}></div>
                <div className={style.button__backgroundContainer}>
                
                {register ? <VerifyRegister/>: 
                    (<form className={style['login-form']}>
                        <div className={`${style.logo}`}>
                            <h1>REGISTER</h1>
                        </div>
                        <div className={style['flex-row']}>
                            <input id="Username" className={style['lf--input']} name="username" placeholder='Username' type='text'
                                value={state.username} onChange={onChangeForm} />
                                  {errorInput.usernameError && <div className={style.error}>{errorInput.usernameError}</div>}

                                  {errorUser.username && <div className={style.errorIsUser}>User with this username field already exists</div>}
                        </div>
                        
                        <div className={style['flex-row']}>
                            <input id="Login" className={style['lf--input']} name="login" placeholder='Login' type='text'
                                value={state.login} onChange={onChangeForm} />
                                {errorInput.loginError && <div className={style.error}>{errorInput.loginError}</div>}

                                { errorUser.login && <div className={style.errorIsUser}>User with this login field already exists</div>}
                        </div>
                    
                        <div className={style['flex-row']}>
                            <input id="Login" className={style['lf--input']} name="email" placeholder='Email' type='email'
                                value={state.email} onChange={onChangeForm} />
                                 {errorInput.emailError && <div className={style.error}>{errorInput.emailError}</div>}

                                 { errorUser.email && <div className={style.errorIsUser}>User with this email field already exists</div>}
                        </div>

                        
                        <div className={style['flex-row']}>
                            <input id="Password" className={style['lf--input']} name='password' placeholder='Password' type='password'
                                value={state.password} onChange={onChangeForm} />
                                 {errorInput.passwordError && <div className={style.error}>{errorInput.passwordError}</div>}
                                 {errorInput.passwordMatch && <div className={style.error}>{errorInput.passwordMatch}</div>}
                        </div>
                        
                        <div className={style['flex-row']}>
                            <input id="confirmPassword" className={style['lf--input']} name='confirmPassword' placeholder='Password_confirm' type='password'
                                value={state.confirmPassword} onChange={onChangeForm} />
                                 {errorInput.confirmPasswordError && <div className={style.error}>{errorInput.confirmPasswordError}</div>}
                                 {errorInput.passwordMatch && <div className={style.error}>{errorInput.passwordMatch}</div>}
                        </div>

                        {isUser &&  <div className={style.error}>Користувач вже існує</div>}
                

                        <input className={style['lf--submit']} type='submit' onClick={onClickRegister} value='Sign Up' />

                        <div className={style['lf--forgot']}>Already throwing balls? <Link to='/login' className={style.logIn}>Log In</Link></div>
                    </form>)}
                    
                </div>
            </div>
        </div>
    );
}

export default Register;
