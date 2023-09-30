import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"
import {useContext} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const cartContext = useContext(CartContext);
    const { items } = cartContext;

    const numberOfCartItems = items.reduce((currentAmount, item) => {
        return currentAmount + item.amount;
    }, 0);

    return (<button className={classes.button} onClick={props.onClick}>
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