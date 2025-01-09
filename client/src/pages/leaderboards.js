
import { useState } from "react"
import LeaderboardRow from "../components/LeaderboardRow"

import { getForLeaderboard } from "../hooks/requests"

const Leaderboard = () => {
    const [leaderboardRows, setLeaderboardRows] = useState(generateTableBody())

    function generateTableBody(){

        // getForLeaderboard().then(
        //     (response) =>{
        //         let teamData = response.json()["StatsByTeamID"];
        //         let key = 0;
        //         let rank = 1;
        //         let teams = []
        //         teamData.array.forEach(element => {
        //             teams.push({key: key, Rank : rank, Team : Object.keys(teamData)[key], Company: "Four County Career Center", ActivityComplete: element.Completed})
        //         });
        //         return teams;
        //     }
        // )

        return [{key: 0, Rank: 1, Team: "IT Academy", Company: "Four County Career Center", ActivityComplete: 5},{key: 1, Rank: 2, Team: "Culinary", Company: "Four County Career Center", ActivityComplete: 3}]
    }

    const leaderboardRowElements = leaderboardRows.map(leaderboardRowObj => 
        <LeaderboardRow 
        key={leaderboardRowObj.key}
        Rank={leaderboardRowObj.Rank}
        Team={leaderboardRowObj.Team}
        Company={leaderboardRowObj.Company}
        ActivityComplete={leaderboardRowObj.ActivityComplete}
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
                                <th>Company</th>
                                <th>Different Activities Completed</th>
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
