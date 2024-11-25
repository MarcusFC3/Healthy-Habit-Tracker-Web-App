import { useCallback } from "react";
import httpRegisterAccount from "./requests";

const registerAccount = useCallback(async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fullName = formData.get("firstName")
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordVerify = formData.get("password_verify");
    if (password !== passwordVerify) {
        alert("ERROR: Passwords do not match")
    }
    else {
        
        response = await httpRegisterAccount({
            fullName,
            username,
            email,
            password,
        });
    }
})

if (response.ok){
    //something happens
} else{
    //Something went wrong
}

export default registerAccount
