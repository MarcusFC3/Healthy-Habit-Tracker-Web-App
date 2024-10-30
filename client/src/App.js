import {
    BrowserRouter as Router,
  } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () =>{
    return (<div class="container">
    <Router exact path= "/">
        <Navbar />
    </Router>
    </div>)
}

export default App;