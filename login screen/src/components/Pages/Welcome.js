import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Header from "../Layout/Header";
const Welcome = (props) => {

    return(

    <>
        <Header></Header>
        <h1>Welcome to the Mail-BOX-Client</h1>


    </>
    )
}

export default Welcome;