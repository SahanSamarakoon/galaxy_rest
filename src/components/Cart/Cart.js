import classes from "./Cart.module.css";
import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import cartSlice from "../../store/cart-slice";
import Modal from "../Common/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = props => {
    const cartDispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const [isCheckout, setCheckout] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const {isLoading, sendRequest : addOrder, error} = useHttp();

    const totalAmount = `$${cartTotalAmount.toFixed(2)}`;
    const hasAmount = cartItems.length > 0;

    const cartItemAddHandler = item => {
        cartDispatch(cartSlice.actions.addItemToCart({...item, amount:1}));
    };
    const cartItemRemoveHandler = id => {
        cartDispatch(cartSlice.actions.removeItemFromCart(id));
    };

    const submitOrderHandler = (userData) => {
        const orderedItems = cartItems.map(item => { return {mealId: item.id, quantity: item.quantity}});
        try{
            addOrder({
                method: "POST",
                body: {
                    user: userData,
                    orderItems: orderedItems,
                    totalAmount: cartTotalAmount,
                    status: "Pending"
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                url: 'http://localhost:8080/order'
            });
            setDidSubmit(true);
            cartDispatch(cartSlice.actions.clearCart());
        }
        catch (err){
            console.log(err);
        }
    }

    const cartItemsComponent = (
        <ul className={classes['cart-items']}>
            {cartItems.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.quantity}
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
            {cartItemsComponent}
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