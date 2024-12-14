
import { useState } from 'react'
import Activity from "../components/Activity";

const Activities = () => {
    const [activities, setActivities] = useState(generateActivity())

    function generateActivity() {
        const activityArray = []

        activityArray[0] = { key:0, Name:"Activity Name", descr: "Activity Description"}

        return activityArray
    }

    console.log(activities)

    function createNewActivity(activityKey, activityName, activityDescr) {
        setActivities(prevActivities => [
            ...prevActivities, {
                key: activityKey,
                Name: activityName,
                descr: activityDescr }
        ])
    }

    function deleteActivity(activityKey) {
        setActivities(prevActivities => [
            prevActivities.splice(activityKey, 1)
        ])
    }

    const activityElements = activities.map(activityObj => 
    <Activity 
        key={activityObj.key} 
        Name={activityObj.Name} 
        descr={activityObj.descr} 
        delete={() => deleteActivity(activityObj.key)}
        />)

    return <div>
        <div className="row">
            <h1>Activities</h1>

            <button onClick={() => { createNewActivity(1, "Activity 1", "This is a test activity")}}>Create Activity</button>

            <div className="activity-container">
                {activityElements}
            </div>
        </div>
    </div>
}
export default Activities;
