// URL of the API
const API_URL = "https://10.44.142.88:8000";

// Function that sends a POST request to create an account
async function httpRegisterAccount(accountData){
    return await fetch(`${API_URL}/login/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            } ,
            body: JSON.stringify(accountData)
        }
    ).catch(
        (error) => { 
            console.log("pppppppppp0ppppppp" + error)
            return {
            ok: false,
        }}
    )
}

// The function that sends a GET request for the login page
async function httpGetAccount(){
    return await fetch(`${API_URL}/login/signup`, 
        {
            headers: {
                "Content-Type":"application/json"
            }
        }
    ).catch(
        (error) => { 
            console.log(error)
            return {
            ok: false,
        }}
    )
}

// The function that sends a GET request for the leaderboard
async function getForLeaderboard(){
    return await fetch(`${API_URL}`, 
        {
            headers: {
                "Content-Type":"application/json"
            }
        }
    ).catch(
        (error) => { 
            console.log(error)
            return {
            ok: false,
        }}
    )
}

export {httpRegisterAccount, httpGetAccount}