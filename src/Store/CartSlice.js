import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false
};
export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
 
    showCartReducer: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export default CartSlice.reducer;
export const CartActions = CartSlice.actions;