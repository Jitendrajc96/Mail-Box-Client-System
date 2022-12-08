import React, { Fragment, useRef, useState } from "react";

import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from "draftjs-to-html";
import { useSelector } from "react-redux";

const CreateEmail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const toEmailInp = useRef();
  const emailHeadingInp = useRef();
  // const emailBodyInp = useRef();
  const userEmail = useSelector(state=>state.auth.email);
  const cleanUserEmail = useSelector(state=>state.auth.cleanEmail);

  const onEditorStateChange = (currEditorState) => {
    setEditorState(currEditorState);
  };

  const sendMailHandler = () => {
    const emailData = {
      from: userEmail,
      to: toEmailInp.current.value,
      heading: emailHeadingInp.current.value,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };

    fetch(`https://mail-box-client-3e006-default-rtdb.firebaseio.com//${cleanUserEmail}/sentemails.json`, {
      method: "POST",
      headers: {
        "Content-type": "application-json",
      },
      body: JSON.stringify(emailData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });

    // console.log(emailData);
    toEmailInp.current.value = "";
    emailHeadingInp.current.value = "";
    setEditorState(EditorState.createEmpty());
  };
  return (
    <Fragment>
      <label>To: </label>
      <input type={"email"} ref={toEmailInp}></input>
      <br />
      <label>Heading: </label>
      <input ref={emailHeadingInp}></input>
      <div
        style={{
          overflow: "scroll",
          backgroundColor: "#abbedb",
          height: "40vw",
        }}
      >
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
        {/* <textarea ref={emailBodyInp}></textarea> */}
      </div>
      <button onClick={sendMailHandler}>Send Mail</button>
    </Fragment>
  );
};

export default CreateEmail;