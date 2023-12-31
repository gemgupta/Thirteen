import { createSlice } from "@reduxjs/toolkit";

const CartItemSlice = createSlice({
  name: "CartItem",
  initialState: {
    items: [],
    totalItems: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalItems = action.payload.totalItems;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const exisitingItems = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.totalItems++;
      state.changed = true;
      if (!exisitingItems) {
        state.items.push({
          id: action.payload.id,
          price: action.payload.price,
          quantity: 1,
          totalPrice: action.payload.price,
          name: action.payload.title,
        });
      } else {
        exisitingItems.quantity = exisitingItems.quantity + 1;
        exisitingItems.totalPrice =
          exisitingItems.totalPrice + action.payload.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const exisitingItems = state.items.find((item) => item.id === id);
      state.totalItems--;
      state.changed = true;

      if (exisitingItems.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        exisitingItems.quantity = exisitingItems.quantity - 1;
        exisitingItems.totalPrice =
          exisitingItems.totalPrice - exisitingItems.price;
      }
    },
  },
});

export const CartItemsActions = CartItemSlice.actions;
export default CartItemSlice.reducer;
