import {Fragment} from "react";

import bannerImage from '../../assets/banner.png';
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Galaxy Rest</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img alt="Company Banner" src={bannerImage}/>
            </div>
        </Fragment>);
};

export default Header;