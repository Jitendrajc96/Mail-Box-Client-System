import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./components/authentication/ForgotPassword";
import LogIn from "./components/authentication/LogIn";
import SignUp from "./components/authentication/SignUp";
import WelcomePage from "./components/WelcomePage/WelcomePage";

function App() {
  return (
    <div className="App">
      <h1>Mail Box Client App</h1>
      <Redirect to={"/login"} />
      <Switch>
        <Route path={"/login"} exact>
          <LogIn />
        </Route>
        <Route path={"/signup"} exact>
          <SignUp />
        </Route>
        <Route path={"/forgotpassword"} exact>
          <ForgotPassword/>
        </Route>
        <Route path={'/welcome'} exact>
          <WelcomePage/>
        </Route>
        <Route path={"*"}>
          <Redirect to={"/login"} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;