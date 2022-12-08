import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../context/authReducer";
import CreateEmail from "./mailbox/CreateEmail";
import Inbox from "./mailbox/Inbox";
import Outbox from "./mailbox/Outbox";
import classes from "./WelcomePage.module.css";
const WelcomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userEmail = useSelector(state=>state.auth.email);
  const [createMailOpen, setCreateMailOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(true);
  const [outboxOpen, setOutboxOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const createMailClickHandler = () => {
    setInboxOpen(false);
    setOutboxOpen(false);
    setCreateMailOpen(true);
  };
  const inboxClickHandler = () => {
    setOutboxOpen(false);
    setCreateMailOpen(false);
    setInboxOpen(true);
  };
  const outboxClickHandler = () => {
    setCreateMailOpen(false);
    setInboxOpen(false);
    setOutboxOpen(true);
  };
  const logoutClickHandler = () => {
    dispatch(authActions.logout());
    history.replace('/login');
  };

  const setUnreadHandler = (data) => {
    setUnreadMessages(data);  
  }

  return (
    <div>
      <div>
        <h1>Welcome To your Mail Box</h1>
        <span>{userEmail}</span>
        <button onClick={logoutClickHandler}>Log Out</button>
      </div>
      <br/>
      <div>
        <div className={classes.sideNav}>
          <button onClick={createMailClickHandler}>Create Email</button>
          <br />
          <button onClick={inboxClickHandler}>In Box</button>
          <span>{unreadMessages}</span>
          <br />
          <button onClick={outboxClickHandler}>Out Box</button>
        </div>
        <div className={classes.mailBox}>
          {createMailOpen && <CreateEmail />}
          {inboxOpen && <Inbox />}
          {inboxOpen && <Inbox setUnread={setUnreadHandler}/>}
          {outboxOpen && <Outbox />}
        </div>
      </div>
    </div>
  );
};
export default WelcomePage;