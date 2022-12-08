import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { authActions } from "../../context/authReducer";
import CreateEmail from "./mailbox/CreateEmail";
import Inbox from "./mailbox/Inbox";
import Outbox from "./mailbox/Outbox";
import classes from "./WelcomePage.module.css";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const Authenticated = useSelector(state=>state.auth.isAuthenticated);
  const userEmail = useSelector(state=>state.auth.email);
  const [createMailOpen, setCreateMailOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(true);
  const [outboxOpen, setOutboxOpen] = useState(false);
@@ -26,24 +32,35 @@ const WelcomePage = () => {
    setOutboxOpen(true);
  };

  const logoutClickHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <div>
      <h1>Welcome To your Mail Box</h1>
      <div className={classes.sideNav}>
        <button onClick={createMailClickHandler}>Create Email</button>
        <br />
        <button onClick={inboxClickHandler}>In Box</button>
        <br />
        <button onClick={outboxClickHandler}>Out Box</button>
      <div>
        <h1>Welcome To your Mail Box</h1>
        {!Authenticated && <Redirect to={'/login'}/>}
        <span>{userEmail}</span>
        <button onClick={logoutClickHandler}>Log Out</button>
      </div>

      <div className={classes.mailBox}>
        {createMailOpen && <CreateEmail />}
        {inboxOpen && <Inbox/>}
        {outboxOpen && <Outbox />}
      <br/>
      <div>
        <div className={classes.sideNav}>
          <button onClick={createMailClickHandler}>Create Email</button>
          <br />
          <button onClick={inboxClickHandler}>In Box</button>
          <br />
          <button onClick={outboxClickHandler}>Out Box</button>
        </div>
        <div className={classes.mailBox}>
          {createMailOpen && <CreateEmail />}
          {inboxOpen && <Inbox />}
          {outboxOpen && <Outbox />}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
export default WelcomePage;