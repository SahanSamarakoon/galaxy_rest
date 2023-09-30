import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {items: updatedItems, totalAmount: updatedTotalAmount}
    }
};

const CartProvider = props => {
    const [cartSate, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    const addItemToCartHandler = item => {
        dispatchCartAction({type: "ADD", item: item});
    };
    const removeItemFromCartHandler = item => {
        dispatchCartAction({type: "REMOVE", item: item});
    };
    const cartContext = {
        items: cartSate.items,
        totalAmount: cartSate.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartProvider;