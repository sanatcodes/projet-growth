import { Calistoga } from '@next/font/google';
import { Category, Props } from '../types/types'
import React from 'react'
import CircleButton from './CircleButton';
import Link from 'next/link';
require('dotenv').config();



export default async function Categories(){
  // const categories = getCategories()
  const DEVELOPER_KEY = process.env.API_KEY;
  const region = "IE";
  const data = await fetch(`https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=${region}&key=${DEVELOPER_KEY}`);
  const res = await data.json();
  
  return (
    <div>
      <h1 className=' text-xl font-medium text-center'>Categories</h1>
      <div className=" grid gap-6 place-items-center grid-cols-fluid ">
        {res.items.map((video:any) => (
            <CircleButton  key={video.id} category={video.snippet.title} id={video.id}  />
        ))}
      </div>
    </div>
  );
};