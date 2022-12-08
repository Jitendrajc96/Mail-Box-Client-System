import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleMail from "./SingleMail";
import { mailActions } from '../../../context/mailReducer';
import { mailActions } from "../../../context/mailReducer";

const Inbox = () => {
const Inbox = (props) => {
  const dispatch = useDispatch();
  const [singleMail, setSingleMail] = useState("");
  const emails =  useSelector(state=>state.mail.inbox);
  const emails = useSelector((state) => state.mail.inbox);
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  if (emails) {
    props.setUnread(Object.keys(emails).reduce((p,key)=>{
      if(emails[key].isRead) return p+1;
      return p;
    },0)-1)
  }

  // if(emails) props.setUnread()
  useEffect(() => {
    fetch(
      `https://mail-box-client-3e006-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox.json`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(mailActions.setInbox(data));
      });
  }, [cleanUserEmail, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `https://mail-box-client-3e006-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox.json`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(mailActions.setInbox(data));
        });
    }, 6000);
    return () => clearInterval(interval);
  }, [cleanUserEmail, dispatch]);

  const openEmailClickHandler = (event) => {
    setSingleMail({
      email: emails[event.currentTarget.id],
      ID: event.currentTarget.id,
    });
  };
  const emailListJSX = emails ? (
    <ul>
      {Object.keys(emails).map((item) => (
        <li
          id={item}
          onClick={openEmailClickHandler}
          style={{
            border: "2px solid black",
            textAlign: "left",
            listStyle: emails[item].isRead?'none':'',
            listStyle: emails[item].isRead ? "none" : "",
          }}
          key={item}
        >
          {/* {<div style={{width: '10px', height:'10px', borderRadius: '50%', backgroundColor: 'red'}}/>} */}
          <span style={{ paddingRight: "10px", textAlign: "left" }}>
            From: {emails[item].from}
          </span>
          <span>Heading: {emails[item].heading}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );
  const onSingleMailCloseHandler = () => {
    setSingleMail("");
  };
  const onSingleMailDeleteHandler = (data) => {
    dispatch(mailActions.setInbox(data));
    setSingleMail("");
  };
  return (
    <Fragment>
      <h3>This is Inbox</h3>
      {!singleMail && emailListJSX}
      {singleMail && (
        <SingleMail
          onDelete={onSingleMailDeleteHandler}
          onClose={onSingleMailCloseHandler}
          data={singleMail}
        />
      )}
    </Fragment>
  );
};
export default Inbox;