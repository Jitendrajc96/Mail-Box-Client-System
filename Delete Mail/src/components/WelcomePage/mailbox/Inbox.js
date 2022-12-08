import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleMail from "./SingleMail";
const Inbox = () => {
  const [emails, setEmails] = useState({});
  const [singleMail, setSingleMail] = useState('');
  const [isread, setIsread] = useState(false);
  // const [viewed, setViewed] = useState('');
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);


  useEffect(() => {
    fetch(
      `https://mail-box-client-3e006-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
      });
  }, [cleanUserEmail]);

  const openEmailClickHandler = (event) => {
    setSingleMail({email: emails[event.currentTarget.id], ID: event.currentTarget.id});
    setIsread(true);
  };

  const emailListJSX = emails ? (
    <ul>
      {Object.keys(emails).map((item) => (
        <li
        <li 
          id={item}
          onClick={openEmailClickHandler}
          style={{
            border: "2px solid black",
            textAlign: "left",
            listStyle: isread?'none' : emails[item].isRead?'none':'',
            listStyle: emails[item].isRead?'none':'',
            // liststyle: viewed,
          }}
          key={item}
        >
          <span style={{ paddingRight: "10px", textAlign: "left" }}>
            From: {emails[item].from}
          </span>
          {/* <hr /> */}
          <span>Heading: {emails[item].heading}</span>
          {/* <hr />
          <p
            dangerouslySetInnerHTML={{ __html: emails[item].body }}
          ></p> */}
        </li>
      ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );

  const onSingleMailCloseHandler = () => {
    setSingleMail('');
    // setViewed('none');
  }

  const onSingleMailDeleteHandler = (data) => {
    setEmails(data);
    setSingleMail('');
  }

  return (
    <Fragment>
      <h3>This is Inbox</h3>
      {!singleMail && emailListJSX}
      {singleMail && <SingleMail onClose={onSingleMailCloseHandler} data={singleMail} />}
      {singleMail && <SingleMail onDelete={onSingleMailDeleteHandler} onClose={onSingleMailCloseHandler} data={singleMail} />}
    </Fragment>
  );
};
export default Inbox;