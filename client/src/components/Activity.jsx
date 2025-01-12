
export default function Activity(props) {

    
    
    return (
        <div className="col-12 col-md-4 Activity">
                <h2>{props.Name}</h2>
                <h3>Reps/Duration: {props.descr}</h3>
                <h4>Progress: {props.progress} / {props.amount}</h4>
                <h4>Time Created: {props.dateCreated}</h4>
                <button onClick={props.increaseProgress}>Complete Rep</button>
                {/* <button onClick={null}>Edit Activity</button> */}
                <button onClick={props.delete}>Delete Activity</button>
        </div>
    )
}