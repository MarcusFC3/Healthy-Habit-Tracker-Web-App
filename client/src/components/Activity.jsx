
export default function Activity(props) {
    const style = {
        width : props.progress
    }

    return (
        <div className="col-12 col-md-4 Activity">
                <h2>{props.Name}</h2>
                <p>{props.descr}</p>
                <div className="progress-bar-holder"><div style={style} className="progress_bar"></div></div>
                <button onClick={props.delete}>Delete Activity</button>
        </div>
    )
}