import { createSlice } from "@reduxjs/toolkit";
import { CartActions } from "./CartSlice";
const CartItemSlice = createSlice({
  name: "CartItem",
  initialState: {
    items: [],
    totalItems: 0,
  },
  reducers: {
    addItem(state, action) {
      const exisitingItems = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.totalItems++;
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

      if (exisitingItems.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        exisitingItems.quantity = exisitingItems.quantity - 1;
        exisitingItems.totalPrice =
          exisitingItems.totalPrice + exisitingItems.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      CartActions.responseNotification({
        status: "Pending",
        message: "Sending Cart Data",
        title: "sending",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://expensetracker-69a6d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();

      dispatch(
        CartActions.responseNotification({
          status: "success",
          message: "Items Added to Cart",
          title: "Sent",
        })
      );
    } catch (error) {
      dispatch(
        CartActions.responseNotification({
          status: "error",
          message: "Sending Cart Data Failed",
          title: "Sending Failed",
        })
      );
    }
  };
};

export const CartItemsActions = CartItemSlice.actions;
export default CartItemSlice.reducer;
