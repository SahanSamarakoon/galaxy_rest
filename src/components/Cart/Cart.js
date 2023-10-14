import classes from "./Cart.module.css";
import Modal from "../Common/Modal";
import React, {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = props => {
    const [isCheckout, setCheckout] = useState(false);
    const cartContext = useContext(CartContext);
    const [didSubmit, setDidSubmit] = useState(false);
    const {isLoading, sendRequest : addOrder, error} = useHttp();

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasAmount = cartContext.items.length > 0;

    const cartItemAddHandler = item => {
        cartContext.addItem({...item, amount:1});
    };
    const cartItemRemoveHandler = id => {
        cartContext.removeItem(id);
    };

    const submitOrderHandler = (userData) => {
        try{
            addOrder({
                method: "POST",
                body: {
                    user: userData,
                    orderedItems: cartContext.items,
                },
                url: 'https://resturent-afdaa-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json'
            });
            setDidSubmit(true);
            cartContext.clearCart();
        }
        catch (err){
            console.log(err);
        }

    }

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

    const  orderHandler = () => setCheckout(true);
    const modalActions =  (
        <div className={classes.actions}>
        <button className={classes['buttonAlt']} onClick={props.onClose}>Close</button>
        {hasAmount && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>);

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
            )}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const errorContent = (
        <React.Fragment>
            <p>Error in sending the order. Please try again !!!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isLoading && !didSubmit && cartModalContent}
            {isLoading && isSubmittingModalContent}
            {!isLoading && didSubmit && (error===null) && didSubmitModalContent}
            {!isLoading && didSubmit && (error!==null) && errorContent}
        </Modal>
    )
};

export default Cart;