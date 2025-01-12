
import { useState, useEffect } from 'react';
import Activity from "../components/Activity";

import { postActivityData, getActivityData } from '../hooks/requests';

let activityCount = 0
let activitiesGenerated = false;
const Activities = () => {
    const [activities, setActivities] = useState(generateActivity)

    // This function is what will pull the activities the user already has
    function generateActivity() {
        return [{ key: 0, Name:"Loading...", descr: "Loading...", amount: 4, progress: 0}]
   
    }
    function getActivities(){
        getActivityData().then(
            (response) =>{
                activityCount = 0;
                setActivities(prevActivities => {
                    prevActivities.splice(prevActivities[0], 1);
                    return [
                    ...prevActivities,
                    ]
                })
                console.log(response)
                let activityData = response["UserActivities"]
                console.log(activityData)
                console.log(Object.entries(activityData))
                let UserActivities = []
                for (let [team, element] of Object.entries(activityData)) {
                   UserActivities.push({key: activityCount, activityName : element.ActivityName,
                    activityDescription : element.ActivityDescription,
                   activityAmount: element.Amount,
                   progress: 0,
                   dateCreated: element.dateCreated
                })
                   activityCount++;
                }
                
                    setActivities(prevActivities => [
                        ...prevActivities, ...UserActivities
                    ])
                
            }
        ).catch((error) =>{
            console.log(error + "AN ERROR HAS OCCURED")
            setActivities(prevActivities => [
                ...prevActivities, {key: 0, activityName : "Error",
                    activityDescription : "Error",
                   activityAmount: "Error",
                   progress: "Error",
                   dateCreated: "Error"
                }
            ])})
    }
    useEffect(() =>{
        getActivities()}
        , [])
    function createNewActivity(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const activityKey = activityCount
        const activityName = formData.get("activityName");
        const activityDescr = formData.get("activityDescr");
        const activityAmount = formData.get("activityAmount");

        const activityData = {
            ActivityName: activityName,
            repsorduration: activityDescr,
            amount: activityAmount
        }

        postActivityData(activityData);

        activityCount++;

        setActivities(prevActivities => [
            ...prevActivities, {
                key: activityKey,
                Name: activityName,
                descr: activityDescr,
                amount: activityAmount, 
                progress: 0}
        ])
    }
 
    function alignKeys(key){
        activities.forEach((activityObj) => {
            if(activityObj.key > key){
                activityObj.key--;
            } 
        })
    }
    
    // There is an error with the delete and increaseprogress 
    // functions that has to do with the fact it is stored in 
    // an object in an array
    const activityElements = activities.map(activityObj => 
    <Activity 
        key={activityObj.key} 
        id={activityObj.key}
        Name={activityObj.Name} 
        descr={activityObj.descr}
        amount={activityObj.amount} 
        progress={activityObj.progress}
        TimeCreated={activityObj.dateCreated}
        delete={function deleteActivity() {
            setActivities(prevActivities => {
                prevActivities.splice(0, prevActivities.length);
                return [
                ...prevActivities,
                ]
            })
            getActivities()
        }}
        increaseProgress={function increaseProgress() {
            setActivities(prevActivities => {
                console.log(prevActivities[activityObj.key].progress += activityObj.progress < activityObj.amount? 1 : 0)
                return [
                ...prevActivities,
                ]
            })
        }}

        /> )

        function openForm() {
            document.getElementById("activity_form_container").style.display = "block"
        }

        function closeForm() {
            document.getElementById("activity_form_container").style.display = "none"
        }

    return <div className='activityBody'>
        <div className="row">
            <h1>Activities</h1>

            <button onClick={openForm} >Create Activity</button>

            <div id="activity_form_container" className="activityForm">
                <form  id="activity_form" onSubmit={createNewActivity}>
                    <h1>Create an Activity</h1>

                    <label>Activity Name</label>
                    <input id="acitivity_name" name="activityName" type="text"></input>

                    <label>Reps/Duration of Activity</label>
                    <input id="acitivity_descr" name="activityDescr" type="text"></input>

                    <label>Sets of Reps</label>
                    <input id="acitivity_amount" name="activityAmount" type="text"></input>

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
