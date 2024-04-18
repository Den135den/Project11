



export function CheckRegisterToken(token) {

   

    if (token) {
        localStorage.setItem('authToken', token);
    }

    const authToken = localStorage.getItem('authToken');


    
    return !!authToken;
}



export function CheckRegisterCode(code){

    
    if (code) {
        localStorage.setItem('codeCheck', code);
    }

    const authToken = localStorage.getItem('codeCheck');
    return !!authToken;
}