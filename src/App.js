import "./App.css";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPass from "./ForgotPass";
import Private from "./Private";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgotPassword" component={ForgotPass} />
          <Route path="/private" component={Private} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
