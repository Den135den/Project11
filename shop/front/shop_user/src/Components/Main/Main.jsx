import React from "react";
import style from "./Main.module.css"
import { Link} from 'react-router-dom';


function Main(){
    




  return(
            <div className={style.animated__background}>
                <div> 
                    <div className={style.wave}></div>
                    <div className={style.wave}></div>
                    <div className={style.wave}></div>
                    <div className={style.button__backgroundContainer}>
                        <Link to='/register'>
                            <button className={style.button__background}>Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
        
  )
}


export default Main;