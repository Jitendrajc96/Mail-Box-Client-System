import React, { Fragment, useState } from "react";
import classes from "./SignUp.module.css";
import apiKey from "../../context/aipKeyStore";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isSignupSuccessfull, setIsSignupSuccessfull] = useState({
    state: false,
    err: "",
  });

  const history = useHistory();
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const signuphandler = async (event) => {
    event.preventDefault();
    setIsSigningUp(true);
    const email = event.target.elements["email"].value;
    const password1 = event.target.elements["password1"].value;
    const password2 = event.target.elements["password2"].value;
    if (password1 === "" || password1.length < 8 || password1 !== password2) {
// if (false){
      alert(
        `Password cannot be empty \nPassword should be atleast 8 charecters long \nBoth Passwords should match`
      );
      setAlert(true);
    } else {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password1,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        )
        const data = await response.json();
        if (response.ok) {
          alert(`Signup Successfull \nYour Email: ${data.email}`);
          // alert(`Signup Successfull \nYour Email: ${data.email}`);
          setIsSignupSuccessfull({ state: true, err: "" });
          history.replace('/login');
          await delay(2000);
          history.replace("/login");
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        setIsSignupSuccessfull({ state: false, err: error });
        // alert(error);
      }
      //   console.log(email, password1, password2);
      event.target.elements["email"].value = "";
      event.target.elements["password1"].value = "";
      event.target.elements["password2"].value = "";
    }
    setIsSigningUp(false);
  };

  const alertOkClickHandler = () => {
    setAlert(false);
  }

  return (
    <Fragment>
      {alert && (
        <div style={{marginBottom: '10px'}}>
        <pre>{`Password cannot be empty \nPassword should be atleast 8 charecters long \nBoth Passwords should match`}</pre>
        <button onClick={alertOkClickHandler}>Ok</button>
        </div>
      )}
      <form className={classes.form} onSubmit={signuphandler}>
        <label htmlFor="email">Email</label>
        <br />
        <input id="email" type="email"></input>
        <br />
        <label htmlFor="password1">Password</label>
        <br />
        <input id="password1" type="password"></input>
        <br />
        <label htmlFor="password2">Confirm Password</label>
        <br />
        <input id="password2" type="password"></input>
        <br />
        <br/>
        {isSigningUp ? (
          <p>Signing Up ...</p>
        ) : (
          <button id="signUpBtn" type="submit">
            Sign Up
          </button>
        )}
        {isSignupSuccessfull.state ? <p>signup Successfull</p> : <p>{`${isSignupSuccessfull.err}`}</p>}
        {isSignupSuccessfull.state ? (
          <p>signup Successfull</p>
        ) : (
          <p>{`${isSignupSuccessfull.err}`}</p>
        )}
        <br />
      </form>
    </Fragment>
  );
};

export default SignUp;
export default SignUp;