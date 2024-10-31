/*
    There will be a form like this 
    <form onSubmit={props.submitLaunch} style={{display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 20px"}}>
      <label htmlFor="launch-day">Launch Date</label>
      <input type="date" id="launch-day" name="launch-day" min={today} max="2040-12-31" defaultValue={today} />
      <label htmlFor="mission-name">Mission Name</label>
      <input type="text" id="mission-name" name="mission-name" />
      <label htmlFor="rocket-name">Rocket Type</label>
      <input type="text" id="rocket-name" name="rocket-name" defaultValue="Explorer IS1" />
      <label htmlFor="planets-selector">Destination Exoplanet</label>
      <select id="planets-selector" name="planets-selector">
*/

const registerAccount = UseCallback(async (e) => {
    e.preventDefault();
    // setPendingLaunch(true);
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
        response = await httpRegisterACcount({
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