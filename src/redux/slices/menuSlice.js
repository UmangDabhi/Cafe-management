import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenu(state, action) {
      state.menu = action.payload;
    },
  },
});

// Export actions for components to dispatch
export const { addMenu } = menuSlice.actions;

// Export reducer to be included in the store
export default menuSlice.reducer;
