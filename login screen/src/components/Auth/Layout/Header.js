import './Header.css';
import { useSelector } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Header = (props)=>{


    return(
        <>
        <nav className="mainHeader">



               <button className="logoutbtn" onClick={props.logOut}>Log Out</button>

        </nav>
        </>
    )
};
export default Header;