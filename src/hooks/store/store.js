import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import checkOutSlice from "./checkOutSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice,
    checkOut: checkOutSlice,
  },
});

export default store;
