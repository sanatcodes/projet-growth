"use client";
import {useState, useEffect} from 'react';
import Link from 'next/link'


const CircleButton = ({category, id}) => {
  
  // write the name of colour next to hex code in a comment
  const colors = [
    "#8D47D3", // Deep Purple
    "#F3FD02", // Yellow
    "#0ABEF5", // Blue
    "#E27525", // Orange
    "#F50ABE", // Pink
  ];

  const i = Math.floor(Math.random() * colors.length);
  const [color,setColor] = useState("purple-500")
  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }, []);
  
  return (
    <Link href={`/categories/${id}`}>
      <button
        className={ ` text-black font-medium rounded-full p-5 mt-10 w-40 h-40 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 active:scale-95  `}
        style={{backgroundColor: color}}
      >
        {category}
      </button>
     </Link>
  );
};

export default CircleButton;
