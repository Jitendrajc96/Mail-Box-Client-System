import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import SingleMail from "./SingleMail";
import { mailActions } from '../../../context/mailReducer';

const Inbox = () => {
  const [emails, setEmails] = useState({});
  const [singleMail, setSingleMail] = useState('');
  // const [viewed, setViewed] = useState('');
  const dispatch = useDispatch();
  const [singleMail, setSingleMail] = useState("");
  const emails =  useSelector(state=>state.mail.inbox);
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);


  useEffect(() => {
    fetch(
      `https://mail-box-client-3e006-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
        dispatch(mailActions.setInbox(data));
      });
  }, [cleanUserEmail]);
  }, [cleanUserEmail, dispatch]);

  const openEmailClickHandler = (event) => {
    setSingleMail({email: emails[event.currentTarget.id], ID: event.currentTarget.id});
    setSingleMail({
      email: emails[event.currentTarget.id],
      ID: event.currentTarget.id,
    });
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
            listStyle: emails[item].isRead?'none':'',
            // liststyle: viewed,
          }}
          key={item}
        >
          {/* {<div style={{width: '10px', height:'10px', borderRadius: '50%', backgroundColor: 'red'}}/>} */}
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
    setSingleMail("");
  };

  const onSingleMailDeleteHandler = (data) => {
    setEmails(data);
    setSingleMail('');
  }
    dispatch(mailActions.setInbox(data));
    setSingleMail("");
  };

  return (
    <Fragment>
      <h3>This is Inbox</h3>
      {!singleMail && emailListJSX}
      {singleMail && <SingleMail onDelete={onSingleMailDeleteHandler} onClose={onSingleMailCloseHandler} data={singleMail} />}
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