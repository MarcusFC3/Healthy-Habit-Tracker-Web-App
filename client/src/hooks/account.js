import {httpRegisterAccount, httpCheckAccount} from "./requests";

async function registerAccount(event){
    event.preventDefault();
    console.log("hkjhkjhkjulkgh")
    const formData = new FormData(event.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordVerify = formData.get("password_verify");
    let response = undefined;
    if (password !== passwordVerify) {
        alert("ERROR: Passwords do not match")
    }
    else {
        console.log(firstName)
        const accountData = {
            firstName,
            lastName,
            username,
            email,
            password,
        }
        console.log("gggggggggv" + JSON.stringify(accountData))
        response = await httpRegisterAccount(accountData).catch((err)=>{
            console.log(err + "\n\n\nNOOOOOOOOOOOOOOOOOO")
        });
       
    }

if (response.ok){
    console.log("Mathmatical")
    //something happens
} else{
    console.log("didn't work")
    //Something went wrong
}
}

async function checkAccount (event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const accountData = {
        email,
        password,
    }

    console.log(accountData)

}

export {registerAccount, checkAccount} 
