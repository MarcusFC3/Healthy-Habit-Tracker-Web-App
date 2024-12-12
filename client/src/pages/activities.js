
import { useState } from 'react'
import Activity from "../components/Activity";

const Activities = () => {
    const [activities, setActivities] = useState(generateActivity())

    function generateActivity() {
        const activityArray = []

        activityArray[0] = { key:0, name:"Activity Name", descr: "Activity Description"}

        return activityArray
    }

    console.log(activities)

    function createNewActivity(activityNum) {
        activities[activityNum] = {key:activityNum, name: "HElloo", descr: "Say hello to fifty people."}

        return activities
    }

    const activityElements = activities.map(activityObj => <Activity key={activityObj.key} name={activityObj.name} descr={activityObj.descr} />)

    return <div>
        <div className="row">
            <h1>Activities</h1>

            <button onClick={() => {createNewActivity(1)}}>Create Activity</button>

            <div className="activity-container">
                {activityElements}
            </div>
        </div>
    </div>
}
export default Activities;
