
import { useState, useEffect } from 'react';
import LeaderboardRow from "../components/LeaderboardRow"

import { getForLeaderboard } from "../hooks/requests"
let tableGenerated = false;
const Leaderboard = () => {
    const [leaderboardRows, setLeaderboardRows] = useState(generateTableBody())
     
    function generateTableBody(){
        return [{key: 0, Rank : 1, Team: "loading" , activitiesStarted : "loading", activitiesCompleted : "loading" ,activitiesCompletedPercentage : "loading"}]
       
    }
    function getLeaderboard(){
    
        getForLeaderboard().then(
            (response) =>{
                setLeaderboardRows(prevLeaderboardRows => {
                    prevLeaderboardRows.splice(prevLeaderboardRows[0], 1);
                    return [
                    ...prevLeaderboardRows,
                    ]
                })
                let teamData = response["StatsByTeamID"];
                console.log(response)
                console.log(Object.keys(teamData))
                console.log(Object.entries(teamData))
               console.log()
                let key = 0;
                let rank = 1;
                let teams = []
                for (let [team, element] of Object.entries(teamData)) {
                   teams.push({key: key, Rank : rank, Team : team , activitiesStarted : element.Started, activitiesCompleted : element.Completed ,activitiesCompletedPercentage : "%"+((element.Completed / element.Started) * 100).toString()})
                   key++;
                   rank++;
                }
                setLeaderboardRows(prevLeaderboardRows => [
                    ...prevLeaderboardRows, ...teams
                ])
            }
        ).catch((error) =>{
            console.log(error + "AN ERROR HAS OCCURED")
            setLeaderboardRows(prevLeaderboardRows => [
                ...prevLeaderboardRows, {key: 1, Rank : 2, Team: "error" , activitiesStarted : "error", activitiesCompleted : "error" ,activitiesCompletedPercentage : "error"}
            ])
        })
        
    
    }
    useEffect(() =>{
        getLeaderboard()}, [])
    const leaderboardRowElements = leaderboardRows.map(leaderboardRowObj => 
        <LeaderboardRow 
        key={leaderboardRowObj.key}
        Rank={leaderboardRowObj.Rank}
        Team={leaderboardRowObj.Team}
        activitiesStarted={leaderboardRowObj.activitiesStarted}
        activitiesCompleted={leaderboardRowObj.activitiesCompleted}
        activitiesCompletedPercentage={leaderboardRowObj.activitiesCompletedPercentage}
        /> 
    )

    return <div>
        <div className="row">
            <div className="col-12 col-md-8">
                <h2>Teams</h2>
                <button onClick={getForLeaderboard}>Generate Leaderboard</button>
                <div id="TeamRankTable">
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Team</th>
                                <th>Activties Started</th>
                                <th>Activties Completed</th>
                                <th>Completion Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboardRowElements}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-12 col-md-4">
                <h2>Something else</h2>
                <p>Desc</p>
            </div>
        </div>
    </div>
}
export default Leaderboard;
