import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../../context/mailReducer";

const SingleMail = (props) => {
  const dispatch = useDispatch();
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);
  const endpoint = props.data.ID;
  useEffect(() => {
    fetch(
      `https://mailboxclient-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox/${endpoint}.json`,
      `https://mail-box-client-3e006-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox/${endpoint}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          isRead: true,
        }),
      }
    );
  }, [cleanUserEmail, endpoint]);
    ).then((res) => {
      if (res.ok) {
        fetch(
          `https://mail-box-client-3e006-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox.json`
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch(mailActions.setInbox(data));
          });
      }
    });
  }, [cleanUserEmail, endpoint, dispatch]);

  const deleteClickHandler = () => {
    fetch(
      `https://mail-box-client-3e006-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox/${endpoint}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(res=>{
      if(res.ok) {
    ).then((res) => {
      if (res.ok) {
        fetch(
          `https://mail-box-client-3e006-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox.json`
        )
          .then((res) => res.json())
          .then((data) => {
            props.onDelete(data);
          });
      }
    });

  };

  return (
    <div>
      <button onClick={props.onClose}>Close</button>
      <h3>{props.data.email.from}</h3>
      <hr />
      <h3>{props.data.email.heading}</h3>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: props.data.email.body }} />
      <button onClick={deleteClickHandler}>Delete This Email!</button>
    </div>
  );
};
export default SingleMail;