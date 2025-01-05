// URL of the API
const API_URL = "https://healthy-habit-tracker-web-app.vercel.app/api";
const axios = require("axios")


const axios = require('axios');
const url = require('url');
const fixieUrl = url.parse(process.env.FIXIE_URL);
const fixieAuth = fixieUrl.auth.split(':');
const proxyobj = {
    protocol: 'http',
    host: fixieUrl.hostname,
    port: fixieUrl.port,
    auth: {username: fixieAuth[0], password: fixieAuth[1]}
  }

// Function that sends a POST request to create an account
async function httpRegisterAccount(accountData){
    return await fetch(`${API_URL}/login/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            } ,
            body: JSON.stringify(accountData),
            credentials: 'include'
        }
    ).catch(
        (error) => { 
            console.log("pppppppppp0ppppppp" + error)
            return {
            ok: false,
        }}
    )
}

// The fucntion that send a POST request to the API to add an activity's data to the database
async function postActivityData(activityData){
    return await fetch(`${API_URL}/activities/create/u`,
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            } ,
            body: JSON.stringify(activityData),
            credentials: 'include'
        }
    )
    .then( (response) => {
        console.log(response.json())
    })
    .catch(
        (error) => { 
            console.log(error)
        }
    )
}

// Function that sends a GET request to the API asking for the activities
//  that are needed for a specific user
async function getActivityData(){
    // I will need the users ID, Team ID, and Company ID to find which
    // activities they need to be displayed
    await fetch(`${API_URL}`,{credentials: 'include'})
    .then(response => {
        if (!response.ok) {
            throw new Error("Response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log("Data recieved:", data)
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    }

    )
}

// The function that sends a POST request for the login page
async function httpAccountLogin(accountLoginData){
    console.log(API_URL)
    console.log(JSON.stringify(process.env))
    return await axios.post(`${API_URL}/login`, {
        proxy: proxyobj
      }).catch((error)=>{
        console.log("An error occurred. :( here it is!" + error + "Again with json string" + JSON.stringify(error))
      })
      
    
    fetch(`${API_URL}/login`, 
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(accountLoginData),
            credentials: 'include'
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
    await fetch(`${API_URL}/activities`,{credentials: 'include'})
    .then(response => {
        if (!response.ok) {
            throw new Error("Response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log("Data recieved:", data)
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    }

    )
}

export {httpRegisterAccount, 
    httpAccountLogin, 
    postActivityData, 
    getForLeaderboard, 
    getActivityData}