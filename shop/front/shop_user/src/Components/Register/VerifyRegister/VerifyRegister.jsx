import React, { useState, useEffect, useContext } from "react";
import style from "./VerifyRegister.module.css";
import { LoginSystem } from "../../../context/SuccessfulEntry/SuccessfulEntry";
import { useNavigate } from "react-router-dom";
import Home from '../../Home/Home'

function VerifyRegister() {

    const navigate = useNavigate(); 

    const [stateOne, setStateOne] = useState({
        checkCodeTextLengthOne: '',
        
    });
    const [stateTwo, setStateTwo] = useState({
        checkCodeTextLengthTwo: '',
        
    });
    const [stateThree, setStateThree] = useState({
        checkCodeTextLengthThree: '',
        
    });
    const [stateFour, setStateFour] = useState({
        checkCodeTextLengthFour: '',
        
    });
    const [stateFive, setStateFive] = useState({
        checkCodeTextLengthFive: '',
        
    });
    const [stateSix, setStateSix] = useState({
        checkCodeTextLengthSix: '',
        
    });

    const {successfulLogin, SetSuccessfulLogin} = useContext(LoginSystem)

    const [errorRegister, SetErrorRegister]  = useState(null)


    function onClickRegister(e) {
        e.preventDefault();

  
        fetch('http://localhost:5000/register/verify', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                checkCodeOne: stateOne.checkCodeTextLengthOne,
                checkCodeTwo: stateTwo.checkCodeTextLengthTwo,
                checkCodeThree: stateThree.checkCodeTextLengthThree,
                checkCodeFour: stateFour.checkCodeTextLengthFour,
                checkCodeFive: stateFive.checkCodeTextLengthFive,
                checkCodeSix: stateSix.checkCodeTextLengthSix,

            })
        })
        .then((response) => {
          
            if(response.status === 200){
                SetSuccessfulLogin(true);
               
            }
            return response.json();
           
        
        })
        .then((data) => {
            console.log(data);
            SetErrorRegister(data.message)
        })
        .catch(error => console.log(error));
    }

    function onChangeForm(e) {
        setStateOne({ ...stateOne, [e.target.name]: e.target.value });
        setStateTwo({ ...stateTwo, [e.target.name]: e.target.value });
        setStateThree({ ...stateThree, [e.target.name]: e.target.value });
        setStateFour({ ...stateFour, [e.target.name]: e.target.value });
        setStateFive({ ...stateFive, [e.target.name]: e.target.value });
        setStateSix({ ...stateSix, [e.target.name]: e.target.value });
    }
 
useEffect(()=>{
    if (successfulLogin) {
        navigate('/home'); 
    }
},[successfulLogin, navigate])


    return (
        <>{successfulLogin? <Home/> :
            <div className={style.animated__background}>
            <div>
                <div className={style.wave}></div>
                <div className={style.wave}></div>
                <div className={style.wave}></div>
                <div className={style.button__backgroundContainer}>
                    <form className={style['login-form']}>
                        <div className={`${style.logo}`}>
                            <h2>Your verification code</h2>
                        </div>

                        <div className={style['flex-row']}>
                            <div className={style.container}>
                            <input id="checkCodeTextLengthOne" className={style['lf--input']} name='checkCodeTextLengthOne' 
                             type='text' value={stateOne.checkCodeTextLengthOne} maxLength={1} onChange={onChangeForm} />


                            <input id="checkCodeTextLengthOne" className={style['lf--input']} name='checkCodeTextLengthTwo' 
                             type='text' value={stateTwo.checkCodeTextLengthTwo} maxLength={1} onChange={onChangeForm} />

                            <input id="checkCodeTextLengthOne" className={style['lf--input']} name='checkCodeTextLengthThree' 
                             type='text' value={stateThree.checkCodeTextLengthThree} maxLength={1} onChange={onChangeForm} />


                            <input id="checkCodeTextLengthOne" className={style['lf--input']} name='checkCodeTextLengthFour' 
                             type='text' value={stateFour.checkCodeTextLengthFour} maxLength={1} onChange={onChangeForm} />


                            <input id="checkCodeTextLengthOne" className={style['lf--input']} name='checkCodeTextLengthFive' 
                             type='text' value={stateFive.checkCodeTextLengthFive} maxLength={1} onChange={onChangeForm} />

                            <input id="checkCodeTextLengthOne" className={style['lf--input']} name='checkCodeTextLengthSix' 
                             type='text' value={stateSix.checkCodeTextLengthSix} maxLength={1} onChange={onChangeForm} />
                            </div>  
                            
                        </div>
                        {errorRegister && <div className={style.errorCode}>{errorRegister}</div>}
                        <input className={style['lf--submit']} type='submit'  onClick = {onClickRegister} value='Sign Up' />
                    </form>
                </div>
            </div>
        </div>}
        </>
      
    );
}

export default VerifyRegister;
