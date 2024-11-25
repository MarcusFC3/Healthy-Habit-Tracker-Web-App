import React from "react"
import { Link} from "react-router-dom"

const Navbar = () => {

    return <div className="row">
        <div className="col-12">
            <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
                <div className="container-fluid">
                    <a className="navbar-brand" aria-disabled="true"><span id="navbarBrand">
                        <img src="logo.svg" alt="Simply Health Logo" height="35"></img>
                    </span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navb`arSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/activities">Activities</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/leaderboards">leaderboards</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/login" >Login</Link></li>
                                    <li><Link className="dropdown-item" to="/sign_up">Sign Up</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
}
export default Navbar