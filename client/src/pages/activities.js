
import { useState } from 'react'
import Activity from "../components/Activity";

let activityCount = 1

const Activities = () => {
    const [activities, setActivities] = useState(generateActivity())

    function generateActivity() {
        const activityArray = []

        activityArray[0] = { key:0, Name:"Activity Name", descr: "Activity Description"}

        return activityArray
    }

    console.log(activities)

    function createNewActivity(activityKey, activityName, activityDescr) {
        activityCount++
        setActivities(prevActivities => [
            ...prevActivities, {
                key: activityKey,
                Name: activityName,
                descr: activityDescr }
        ])
        console.log(activities)
    }

    function deleteActivity(activityKey) {
        setActivities(prevActivities => {
            prevActivities.splice(prevActivities[activityKey], 1)
            return [
            ...prevActivities,
            ]
    })

        console.log(activities)
    }

    function editActivity(activityKey) {

        setActivities(prevActivities => {
            prevActivities[activityKey] = {}
        })
    }

    const activityElements = activities.map(activityObj => 
    <Activity 
        key={activityObj.key} 
        Name={activityObj.Name} 
        descr={activityObj.descr} 
        delete={() => deleteActivity(activityObj.key)}
        />)

        // Create an open form function

    return <div>
        <div className="row">
            <h1>Activities</h1>

            <button onClick={() => {createNewActivity(activityCount, "Activity " + activityCount, "This is a test activity")}}>Create Activity</button>

            <div id="activity_form_container" className="activityForm">
                <form  id="activity_form" onSubmit={null}>
                    <h1>Create an Activity</h1>

                    <label>Activity Name</label>
                    <input id="acitivity_name" name="activityName" type="text"></input>

                    <label>Activity Description</label>
                    <input id="acitivity_descr" name="activityDescr" type="text"></input>

                    <label>Activity Progress</label>
                    <input id="acitivity_progress" name="activityProgress" type="text"></input>

                    <button onClick={null}>Create Activity</button>
                    <button type="button" className="btn cancel" onClick={null}>Close</button>
                </form>
            </div>

            <div className="activity-container">
                {activityElements}
            </div>
        </div>
    </div>
}
export default Activities;
