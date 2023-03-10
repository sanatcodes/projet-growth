import axios from 'axios';
import categories from '.././../types/categories'
import { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config();

async function getCategories() {
  const DEVELOPER_KEY = process.env.API_KEY
  const region = "IE"
  const response = await axios.get('https://www.googleapis.com/youtube/v3/videoCategories', {
    params: {
      part: 'snippet',
      regionCode: region,
      key: DEVELOPER_KEY,
    }
  });
  const categories = response.data.items;
  console.log(categories);
  
  return {
    props: {
      categories: categories []
    },
    revalidate: 60 * 60 * 24 // revalidate every 24 hours
  };
}

export default getCategories;