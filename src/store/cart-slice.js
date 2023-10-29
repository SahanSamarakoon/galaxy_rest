import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmount: 0,
        changed: false,
    },
    reducers: {
        replaceCart(state, action) {
            state.totalAmount = action.payload.totalAmount;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalAmount= state.totalAmount + (newItem.price * newItem.amount);
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: newItem.amount,
                    totalPrice: newItem.price,
                    name: newItem.name,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + (newItem.price * newItem.amount);
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalAmount= state.totalAmount - (existingItem.price);
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
        clearCart(state, action) {
            state.items= [];
            state.totalAmount=0;
            state.changed = true;
        }
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
