import React, { useEffect } from "react";
import { Card } from "./card";
import menu from "../menu.json";
import { Tabs } from "antd";
import store from "../redux/store";
import {
  addToOrder,
  removeFromOrder,
  resetOrder,
} from "../redux/slices/tablesSlice";
import { useSelector } from "react-redux";

export const MenuComponent = ({ tableIndex }) => {
  useEffect(() => {
    console.log("the tbale index in the menu js is ", tableIndex);
  }, [tableIndex]);

  const { dispatch } = store;
  const tableOrder = useSelector(
    (state) => state.tables[tableIndex].orders
  );

  const handleAddToOrder = (item) => {
    dispatch(addToOrder({ tableIndex, menuItem: item }));
  };

  const handleRemoveFromOrder = (item) => {
    dispatch(removeFromOrder({ tableIndex, menuItem: item }));
  };

  const handleResetOrder = () => {
    dispatch(resetOrder({ tableIndex }));
  };

  const tabItems = menu.menu.map((category, categoryIndex) => ({
    label: category.category,
    key: `category-${categoryIndex}`,
    children: (
      <div className="grid grid-cols-6 gap-3">
        {category.items.map((element) => {
          const currentItem = tableOrder.find(
            (orderItem) => orderItem.name === element.name
          );
          const quantity = currentItem ? currentItem.quantity : 0;
          return (
            <Card
              key={element.name}
              name={element.name}
              description={element.description}
              price={element.price}
              quantity={quantity}
              onAdd={() => {
                console.log("i am adding ");
                handleAddToOrder(element);
              }}
              onRemove={() => {
                console.log("i am removing ");
                handleRemoveFromOrder(element);
              }}
            />
          );
        })}
      </div>
    ),
  }));

  return (
    <div style={{ padding: "20px" }}>
      <Tabs defaultActiveKey={tabItems[0]?.key} items={tabItems} />
    </div>
  );
};
