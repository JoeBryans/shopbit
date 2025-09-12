import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState, shippLoadState } from "./localstorage";

const initialState = {
  // cartItems:[]
  cartItems: loadState("cartItems"),
  //   qty: 1,
  shippingAddress: shippLoadState("shippinInfo"),
  paymentMethod: shippLoadState("paymentMethod"),
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existItems = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existItems >= 0) {
        state.cartItems[existItems].qty += 1;
      } else {
        state.cartItems.push({ ...action.payload, qty: 1 });
      }
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      saveState("cartItems", state.cartItems);
    },
    DecreaseQty: (state, action) => {
      const existItems = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existItems && existItems.qty > 1) {
        existItems.qty -= 1;
      }
      saveState("cartItems", state.cartItems);

      //   localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      // localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
      saveState("cartItems", state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveState("cartItems", state.cartItems);

      // localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },
    addShippinAddress: (state, action) => {
      state.shippingAddress = action.payload;
      // localStorage.setItem("shippinInfo",JSON.stringify(state.shippinInfo))
      saveState("shippinInfo", state.shippingAddress);
    },
    removeShippinAddress: (state) => {
      state.shippingAddress = {
        address: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        name: "",
        email: "",
        phone: "",
      };
      // localStorage.setItem("shippinInfo",JSON.stringify(state.shippinInfo))
      saveState("shippinInfo", state.shippingAddress);
    },
    addPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      saveState("paymentMethod", state.paymentMethod);
    },
    removePaymentMethod: (state, action) => {
      state.paymentMethod = null;
      saveState("paymentMethod", state.paymentMethod);
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  DecreaseQty,
  clearCart,
  addShippinAddress,
  removeShippinAddress,
  addPaymentMethod,
  removePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
