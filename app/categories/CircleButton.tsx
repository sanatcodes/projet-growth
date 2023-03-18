'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Props {
  category: string;
  id: string;
}

const CircleButton = ({ category, id }: Props) => {
  // write the name of colour next to hex code in a comment
  const colors = [
    '#F3FD02', // Yellow
    '#0ABEF5', // Blue
    '#E27525', // Orange
    '#F50ABE', // Pink
    '#F2D600', //a slightly darker, more golden yellow
    '#0098DB', //(a slightly darker, more muted blue),
    '#FF5722', //(a brighter, more intense orange)
    '#E91E63', //(a brighter, more intense pink)
  ];

  const i = Math.floor(Math.random() * colors.length);
  const [color, setColor] = useState('purple-500');
  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }, []);

  return (
    <Link href={`/categories/${id}`}>
      <button
        className={` text-black font-medium rounded-full p-5 mt-10 w-40 h-40 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 active:scale-95  `}
        style={{ backgroundColor: color }}
      >
        {category}
      </button>
    </Link>
  );
};

export default CircleButton;
