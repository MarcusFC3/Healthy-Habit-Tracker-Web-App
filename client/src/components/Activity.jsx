
export default function Activity(props) {
    const style = {
        width : props.progress
    }

    return (
        <div className="col-12 col-md-4 Activity">
                <h2>{props.name}</h2>
                <p>{props.descr}</p>
                <div className="progress-bar-holder"><div style={style} className="progress_bar"></div></div>
                <button onClick={null}>Edit Activity</button>


                            <div className="editActivity dropdown">
                                <h2 className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Edit Activity
                                </h2>
                                <ul className="dropdown-menu">
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>


                <button onClick={null}>Delete Activity</button>
        </div>
    )
}