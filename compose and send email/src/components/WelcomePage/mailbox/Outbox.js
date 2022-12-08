import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Outbox = (props) => {
  const [emails, setEmails] = useState({});
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(
      `https://mail-box-client-3e006-default-rtdb.firebaseio.com/${cleanUserEmail}/sentemails.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
      });
  }, [cleanUserEmail]);

  const emailListJSX = emails ? (
    <ul>
      {Object.keys(emails).map((item) => (
        <p style={{ border: "2px solid black", textAlign: 'left' }} key={item}>
          <label style={{textAlign: 'left'}}>To: {emails[item].to}</label>
          <hr />
          <label>Heading: {emails[item].heading}</label>
          <hr />
          <p
            dangerouslySetInnerHTML={{ __html: emails[item].body }}
          ></p>
        </p>
      ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );

  return (
    <Fragment>
      <h4>This is outbox</h4>
      {emailListJSX}
    </Fragment>
  );
};

export default Outbox;