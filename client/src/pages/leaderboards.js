
const Leaderboard = () => {

    function createTableBody(){
        /* 
        I want to do something like this : 
        for each team in our team database 
        create a new tr and return it
        */
        return <tr>
            <td>1</td>
            <td>IT Academy</td>
            <td>Four County Career Center</td>
            <td>5</td>
        </tr>
    }

    return <div>
        <div className="row">
            <div className="col-12 col-md-8">
                <h2>Teams</h2>
                <div>

                    {/* 
                    add more content to the leaderboards.
                    add the ability to sort/search through the teams 
                    */}

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
                            {createTableBody()}
                            <tr>
                                <td>2</td>
                                <td>Culinary</td>
                                <td>Four County Career Center</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>team name</td>
                                <td>company name</td>
                                <td>activities  completed</td>
                            </tr>
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
