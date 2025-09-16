 import { createSlice } from "@reduxjs/toolkit";
import { loadCheckoutStorage, saveState } from "./localstorage";

const initialState = {
    address: loadCheckoutStorage("address") || null,
    paymentMethod: loadCheckoutStorage("paymentMethod") || null,
    cartItems: loadCheckoutStorage("cartItems") || null,
    totalPrice: loadCheckoutStorage("totalPrice") || null,
};
const checkOutSlice = createSlice({
    name: "checkOut",
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
            saveState("address", action.payload);
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            saveState("paymentMethod", action.payload);
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
            saveState("cartItems", action.payload);
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
            saveState("totalPrice", action.payload);
        },
    },
});

export const { setAddress, setPaymentMethod, setCartItems, setTotalPrice } =
    checkOutSlice.actions;      
export default checkOutSlice.reducer;