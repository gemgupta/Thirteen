import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  responses: null,
};
export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    showCartReducer: (state) => {
      state.showCart = !state.showCart;
    },
    responseNotification: (state, action) => {
      state.responses = {
        status: action.payload.status,
        message: action.payload.message,
        title: action.payload.title,
      };
    },
  },
});

export default CartSlice.reducer;
export const CartActions = CartSlice.actions;
