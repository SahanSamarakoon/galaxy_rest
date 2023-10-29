import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const HeaderCartButton = props => {
    const [btnIsBumped, setBtnIsBumped] = useState(false);
    const items = useSelector(state => state.cart.items);

    const numberOfCartItems = items.length;

    const btnClasses = `${classes.button} ${btnIsBumped ? classes.bump : ''}`;
    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsBumped(true);

        const timer = setTimeout(() => {
            setBtnIsBumped(false);
        }, 300)

        return ()=> clearTimeout(timer);

    }, [items]);

    return (<button className={btnClasses} onClick={props.onClick}>
        <span>
            <CartIcon/>
        </span>
        <span>
            Your Cart
        </span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>);
};

export default HeaderCartButton;