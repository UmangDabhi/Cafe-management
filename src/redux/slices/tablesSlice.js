import { createSlice } from "@reduxjs/toolkit";

// Initial state: 10 tables, each with an empty order
const initialState = Array.from({ length: 10 }, () => ({
  tableId: null,
  orders: [],
  customerName: null,
  customerNumber: null,
}));

const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    addToOrder(state, action) {
      const { tableIndex, menuItem } = action.payload;
      const table = state[tableIndex];

      const existingItem = table.orders.find(
        (item) => item.name === menuItem.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        table.orders.push({ ...menuItem, quantity: 1 });
      }
    },
    removeFromOrder(state, action) {
      const { tableIndex, menuItem } = action.payload;
      const table = state[tableIndex];

      const existingItem = table.orders.find(
        (item) => item.name === menuItem.name
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          table.orders = table.orders.filter(
            (item) => item.name !== menuItem.name
          );
        }
      }
    },
    resetOrder(state, action) {
      const { tableIndex } = action.payload;
      state[tableIndex].orders = [];
      state[tableIndex].customerName = null;
      state[tableIndex].customerNumber = null;
    },
    addCustomerDetails(state, action) {
      const { tableIndex, customerName, customerNumber } = action.payload;
      state[tableIndex].customerName = customerName;
      state[tableIndex].customerNumber = customerNumber;
    },
  },
});

// Export actions to use in components
export const { addToOrder, removeFromOrder, resetOrder, addCustomerDetails } =
  tablesSlice.actions;

// Export reducer to configure in store
export default tablesSlice.reducer;
