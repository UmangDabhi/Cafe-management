import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

export const Card = ({
  name,
  description,
  price,
  quantity = 0,
  onAdd,
  onRemove,
}) => {
  return (
    <div class="bg-white rounded-lg shadow-md p-4 max-w-xs">
      <img
        alt="Illustration of Chicken Dimsum in a bamboo steamer with chopsticks and a leaf on a mat"
        class="rounded-t-lg w-full"
        src="https://placehold.co/300x200"
      />
      <div class="p-4">
        <h2 class="text-md font-semibold flex justify-between">
          {name}
          <div class="text-md font-bold">{JSON.stringify(price)}</div>
        </h2>
        {/* <p class="text-gray-500">{description}</p> */}
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center space-x-2">
            <button
              class="bg-gray-200 text-gray-600 rounded-full w-7 h-7 flex items-center justify-center"
              onClick={onRemove}
              disabled={quantity === 0}
            >
              <MinusOutlined />
            </button>
            <span class="text-md">{quantity}</span>
            <button
              class="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
              onClick={onAdd}
            >
              <PlusOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
