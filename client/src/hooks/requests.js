const API_URL = "";
async function httpRegisterAccount(accountData){
    return await fetch(`${API_URL}/signup`,
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