import React from "react";
import Link from 'next/link'

const colors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
  "#f0f0f0",
  "#0f0f0f",
  "#f5a623",
  "#9b59b6"
];

const CircleButton = ({category, id}) => {
  
  const i = Math.floor(Math.random() * colors.length);
  return (
    <Link href={`/categories/${id}`}>
      <button
        className={ ` text-black font-medium rounded-full p-5 mt-10 w-40 h-40 bg-purple-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 active:scale-95  `}
      >
        {category}
      </button>
     </Link>
  );
};

export default CircleButton;
