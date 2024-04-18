
export function FetchAPIRegister(value, state) {
      
    fetch(value,
     {
         method:'POST',
         headers:{
             'Content-type':'application/json'
         },
         body: JSON.stringify({
             username: state.username,
             login: state.login,
             email: state.email,
             password: state.password,
             confirmPassword: state.confirmPassword,
         })
     })
  
 }