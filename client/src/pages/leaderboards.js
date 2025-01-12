
import { useState } from "react"
import LeaderboardRow from "../components/LeaderboardRow"

import { getForLeaderboard } from "../hooks/requests"

const Leaderboard = () => {
    const [leaderboardRows, setLeaderboardRows] = useState(generateTableBody())

    async function generateTableBody(){
        getForLeaderboard().then(
            (response) =>{
                console.log(response)
                let teamData = response["StatsByTeamID"];
                let key = 0;
                let rank = 1;
                let teams = []
                teamData.array.forEach(element => {

                    console.log(element)
                    teams.push({key: key, Rank : rank, Team : "idk" , activtiiesStarted : element.Started, activitiesCompleted : element.Completed ,activitiesCompletedPercentage : "%"+((element.Completed / element.Started) * 100).toString()})
                    key++;
                    rank++;
                });
                return teams;
            }
        ).catch((error) =>{
            console.log(error + "AN ERROR HAS OCCURED")
            return [{key: 1, Rank : 2, Team: "error" , activtiiesStarted : "error", activitiesCompleted : "error" ,activitiesCompletedPercentage : "error"}]
        })
        //return [{key: 0, Rank : 1, Team: "loading" , activtiiesStarted : "loading", activitiesCompleted : "loading" ,activitiesCompletedPercentage : "loading"}]
       
    }
    const leaderboardRowElements = leaderboardRows.map(leaderboardRowObj => 
        <LeaderboardRow 
        key={leaderboardRowObj.key}
        Rank={leaderboardRowObj.Rank}
        Team={leaderboardRowObj.Team}
        activtiiesStarted={leaderboardRowObj.activtiiesStarted}
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
