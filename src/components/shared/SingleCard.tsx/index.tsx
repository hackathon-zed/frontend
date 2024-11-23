"use client";
import { useState } from "react";
function SingleCard() {
  let [count, setCount] = useState(0);

  function DecrementCount() {
    setCount(count - 1);
    if (count == 1) {
      setCount(1);
    }
  }
  function IncrementCount() {
    setCount(count + 1);
  }

  return (
    <div className="p-6 bg-gradient-to-b from-cyan-400 to-cyan-50 shadow-md rounded-md max-w-xl mx-auto">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <img
            src="https://via.placeholder.com/200"
            alt="Product"
            className="w-full rounded-md"
          />
        </div>
        <div className="w-1/2 flex flex-col space-y-2">
          <img
            src="https://via.placeholder.com/50"
            alt="Thumbnail"
            className="w-12 h-12 rounded-md"
          />
          <img
            src="https://via.placeholder.com/50"
            alt="Thumbnail"
            className="w-12 h-12 rounded-md"
          />
          <img
            src="https://via.placeholder.com/50"
            alt="Thumbnail"
            className="w-12 h-12 rounded-md"
          />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Mithili Art</h2>
        <div className="flex items-center space-x-2 mt-2">
          <div className="text-yellow-500">★★★★☆</div>
          <p className="text-sm text-gray-600">(4 Customer Reviews)</p>
        </div>
        <p className="mt-2 text-gray-500">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form.
        </p>
      </div>

      <div className="mt-4">
        <p className="text-lg font-bold text-red-600">$650</p>
        <p className="text-sm line-through text-gray-400">$690</p>
        <p className="text-sm text-green-500">30% Off</p>
      </div>

      <div className="mt-4">
        <div className="flex items-center space-x-4">
          <p className="text-sm font-semibold">Quantity:</p>
          <div className="flex items-center space-x-2">
            <button
              className="px-2 py-1 bg-gray-200 rounded-md"
              onClick={DecrementCount}
            >
              -
            </button>
            <input
              type="text"
              value={count}
              className="w-12 text-center border rounded-md"
            />
            <button
              className="px-2 py-1 bg-gray-200 rounded-md"
              onClick={IncrementCount}
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <p className="text-sm font-semibold">Size:</p>
          <select className="border rounded-md px-2 py-1">
            <option>Choose Size</option>
            <option>Large</option>
            <option>Small</option>
            <option>Medium</option>
          </select>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <p className="text-sm font-semibold">Color:</p>
          <div className="flex space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add To Cart
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          Wishlist
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>
          Stock: <span className="font-semibold text-gray-800">Available</span>
        </p>
        <p>
          SKU: <span className="font-semibold text-gray-800">656TYTR</span>
        </p>
        <p>
          Category:{" "}
          <span className="font-semibold text-gray-800">Medicine</span>
        </p>
        <p>
          Brand: <span className="font-semibold text-gray-800">Novak</span>
        </p>
      </div>
    </div>
  );
}

export default SingleCard;
