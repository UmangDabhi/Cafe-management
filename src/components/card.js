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
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs transition-transform duration-200 transform hover:scale-105">
      <img
        alt="Illustration of Chicken Dimsum in a bamboo steamer with chopsticks and a leaf on a mat"
        className="rounded-t-lg w-full"
        src="https://placehold.co/300x200"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold flex justify-between items-center">
          <span className="text-gray-800">{name}</span>
          <span className="text-md font-semibold text-gray-600">{JSON.stringify(price)}</span>
        </h2>
        {/* <p className="text-gray-500">{description}</p> */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <button
              className={`bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 ${quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={onRemove}
              disabled={quantity === 0}
            >
              <MinusOutlined />
            </button>
            <span className="text-lg text-gray-800">{quantity}</span>
            <button
              className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 hover:bg-blue-700"
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
