import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../../context/mailReducer";
import OutBoxSingleMail from "./OutBoxSingleMail";

const Outbox = (props) => {
  const [emails, setEmails] = useState({});
  const dispatch = useDispatch();
  const [outSingleMail, setSingleMail] = useState("");
  const emails = useSelector((state) => state.mail.sentmail);
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(
      `https://mail-box-client-3e006-default-rtdb.firebaseio.com/${cleanUserEmail}/sentemails.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
        dispatch(mailActions.setSentMail(data));
      });
  }, [cleanUserEmail]);
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
        <li style={{ border: "2px solid black", textAlign: 'left' }} key={item}>
          <label style={{textAlign: 'left'}}>To: {emails[item].to}</label>
          <hr />
          <label>Heading: {emails[item].heading}</label>
          <hr />
          <p
            dangerouslySetInnerHTML={{ __html: emails[item].body }}
          ></p>
        <li
          id={item}
          onClick={openEmailClickHandler}
          style={{
            border: "2px solid black",
            textAlign: "left",
            listStyle: "none",
          }}
          key={item}
        >
          <span style={{ paddingRight: "10px", textAlign: "left" }}>
            To: {emails[item].to}{" "}
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
    dispatch(mailActions.setSentMail(data));
    setSingleMail("");
  };

  return (
    <Fragment>
      <h4>This is outbox</h4>
      {emailListJSX}
      {!outSingleMail && emailListJSX}
      {outSingleMail && <OutBoxSingleMail
        onDelete={onSingleMailDeleteHandler}
        onClose={onSingleMailCloseHandler}
        data={outSingleMail}
      /> } 
    </Fragment>
  );
};
export default Outbox;