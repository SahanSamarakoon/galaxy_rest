import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [btnIsBumped, setBtnIsBumped] = useState(false);
    const cartContext = useContext(CartContext);
    const {items} = cartContext;

    const numberOfCartItems = items.reduce((currentAmount, item) => {
        return currentAmount + item.amount;
    }, 0);

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