
export default function LeaderboardRow(props) {

    return (
        <tr >
            <td>{props.Rank}</td>
            <td>{props.Team}</td>
            <td>{props.Company}</td>
            <td>{props.ActiviyComplete}</td>
        </tr>
    )
}