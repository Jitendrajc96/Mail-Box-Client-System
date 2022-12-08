import React, { useState } from "react";
import CreateEmail from "./mailbox/CreateEmail";
import Inbox from "./mailbox/Inbox";
import Outbox from "./mailbox/Outbox";
import classes from "./WelcomePage.module.css";

const WelcomePage = () => {
  const [createMailOpen, setCreateMailOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(true);
  const [outboxOpen, setOutboxOpen] = useState(false);
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
  return (
    <div>
      <h1>Welcome To your Mail Box</h1>
      <div className={classes.sideNav}>
        <button onClick={createMailClickHandler}>Create Email</button>
        <br />
        <button onClick={inboxClickHandler}>In Box</button>
        <br />
        <button onClick={outboxClickHandler}>Out Box</button>
      </div>

      <div className={classes.mailBox}>
        {createMailOpen && <CreateEmail />}
        {inboxOpen && <div>This is Inbox</div>}
        {inboxOpen && <Inbox/>}
        {outboxOpen && <Outbox />}
      </div>
    </div>
  );
};
export default WelcomePage;