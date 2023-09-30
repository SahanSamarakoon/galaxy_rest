import classes from "./Cart.module.css";
import Modal from "../Common/Modal";
import {useContext} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = props => {
    const cartContext = useContext(CartContext);
    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

    const hasAmount = totalAmount > 0;
    const cartItemAddHandler = item => {
        cartContext.addItem({...item, amount:1});
    };
    const cartItemRemoveHandler = id => {
        cartContext.removeItem(id);
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartContext.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );


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