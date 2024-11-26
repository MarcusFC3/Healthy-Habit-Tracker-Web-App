const API_URL = "https://10.44.142.88:8000";
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
        (error) => { return {
            ok: false,
        }}
    )
}