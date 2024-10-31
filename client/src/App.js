import {
    BrowserRouter as Router,
  } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home"

const App = () =>{
    return (<div class="container">
    <Router exact path= "/">
        <Navbar />
        <Home />
    </Router>
    </div>)
}

export default App;