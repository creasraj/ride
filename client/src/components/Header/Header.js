import React from "react";
import STYLES from './Header.scss';
import Logo from '../../assets/logo.png';
import {Link} from "react-router-dom";

const c = className => STYLES[className] || 'UNKNOWN';


const Header = () => {

    return (
        <header className={c('header')}>
            <a href="/" className={c('logo')} id="logo">
                <img src={Logo} width={'70px'} height={'70px'}  alt={'logo'}/>
            </a>

            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><Link to={"/trips"}>Trips</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
