
import { useState } from 'react'
import Activity from "../components/Activity";

let activityCount = 1

const Activities = () => {
    const [activities, setActivities] = useState(generateActivity())

    // This function is what will pull the activities the user already has
    function generateActivity() {
        const activityArray = []

        activityArray[0] = { key:0, Name:"Activity Name", descr: "Activity Description"}

        return activityArray
    }

    function createNewActivity(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const activityKey = activityCount
        const activityName = formData.get("activityName");
        const activityDescr = formData.get("activityDescr");
        activityCount++
        setActivities(prevActivities => [
            ...prevActivities, {
                key: activityKey,
                Name: activityName,
                descr: activityDescr }
        ])
    }

    function deleteActivity(activityKey) {
        setActivities(prevActivities => {
            console.log(activityKey)
            prevActivities.splice(prevActivities[activityKey], 1)
            return [
            ...prevActivities,
            ]
    })
    }

    // function editActivity(activityKey) {

    //     setActivities(prevActivities => {
    //         prevActivities[activityKey] = {}
    //     })
    // }

    const activityElements = activities.map(activityObj => 
    <Activity 
        key={activityObj.key} 
        Name={activityObj.Name} 
        descr={activityObj.descr} 
        delete={() => deleteActivity(activityObj.key)}
        /> )

        // Create an open form function      onClick={() => {createNewActivity(activityCount, "Activity " + activityCount, "This is a test activity")}}
        function openForm() {
            document.getElementById("activity_form_container").style.display = "block"
        }

        function closeForm() {
            document.getElementById("activity_form_container").style.display = "none"
        }

    return <div>
        <div className="row">
            <h1>Activities</h1>

            <button onClick={openForm} >Create Activity</button>

            <div id="activity_form_container" className="activityForm">
                <form  id="activity_form" onSubmit={createNewActivity}>
                    <h1>Create an Activity</h1>

                    <label>Activity Name</label>
                    <input id="acitivity_name" name="activityName" type="text"></input>

                    <label>Activity Description</label>
                    <input id="acitivity_descr" name="activityDescr" type="text"></input>

                    <label>Activity Progress</label>
                    <input id="acitivity_progress" name="activityProgress" type="text"></input>

                    <button>Create Activity</button>
                    <button type="button" onClick={closeForm}>Close</button>
                </form>
            </div>

            <div className="activity-container">
                {activityElements}
            </div>
        </div>
    </div>
}
export default Activities;
