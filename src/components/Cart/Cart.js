import classes from "./Cart.module.css";
import Modal from "../Common/Modal";
import {useContext} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = props => {
    const cartContext = useContext(CartContext);
    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

    const hasAmount = totalAmount > 0;
    const cartItemAddHandler = id => {};
    const cartItemRemoveHandler = item => {};

    const cartItems = (<ul className={classes["cart-items"]}>
        {cartContext.items.map((item) => <CartItem key={item.id} name={item.name} price={item.price}
                                                   amount={item.amount} onAdd={cartItemAddHandler} onRemove={cartItemRemoveHandler}/>)}
    </ul>);


    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['buttonAlt']} onClick={props.onClose}>Close</button>
                {hasAmount && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
};

export default Cart;