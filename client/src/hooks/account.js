
const registerAccount = UseCallback(async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const fullName = new Date(data.get("launch-day"));
    const username = data.get("mission-name");
    const email = data.get("rocket-name");
    const password = data.get("planets-selector");
    const passwordVerify = data.get("planets-selector");
    if (password !== passwordVerify) {
        //error
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


