import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalQ: 0,
    changed: false,
  },
  reducers: {
      replaceCart(state, action) {
          state.totalQ = action.payload.totalQ;
            state.cartItems = action.payload.cartItems;
      },
    addItemToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      state.totalQ++;
      state.changed = true
      if (!existingItem) {
        state.cartItems.push({ ...item, quantity: 1 });
      } else {
        existingItem.quantity++;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQ--;
      state.changed = true
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});



export default cartSlice;
export const cartActions = cartSlice.actions;
