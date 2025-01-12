
export default function LeaderboardRow(props) {

    return (
        <tr >
            <td>{props.Rank}</td>
            <td>{props.Team}</td>
            <td>{props.activitiesStarted}</td>
            <td>{props.activitiesCompleted}</td>
            <td>{props.activitiesCompletedPercentage}</td>

        </tr>
    )
}