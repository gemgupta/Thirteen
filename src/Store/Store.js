import { configureStore } from "@reduxjs/toolkit";

import CartReducer from './CartSlice'
import CartItemsReducer from './CartItemSlice'
export const store= configureStore({reducer: { Cart: CartReducer, CartItems: CartItemsReducer}})