import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import { AiFillYoutube } from 'react-icons/ai';
import { IconContext } from "react-icons";
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <section className=" h-100 bg-gradient-to-b from-gray-700 to-gray-900 min-h-screen">
        <nav className="bg-gray-800 p-6 flex justify-between">
              <h1 className=' text-xl'>Project Growth</h1>
              <ul className=" flex items-center">
                <li>
                  <Link
                    href="/categories"
                    className="text-lg font-medium text-gray-100 hover:text-white mr-4"
                  >
                    Cateogries
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-lg font-medium text-gray-100 hover:text-white mr-4"
                  >
                    About
                  </Link>
                </li>
              </ul>
        </nav>

        <div>
            <div className='  flex flex-col  pt-20 justify-center items-center'>
              <div className=' text-7xl flex flex-row gap-5 items-center'>
                <AiFillYoutube style={{color: "#8D47D3"}}/>
              <h1 className='text-5xl'>Project Growth</h1>
              </div>
              <h3 className=' text-lg'>Predicting and measuring creative trends</h3>
              
                <Link href="/categories">
                  <button className=' bg-purple-500 p-3 rounded-md mt-10 '>
                   Explore Categories
                  </button>
                </Link>
            </div>
        </div>  

      </section>
    </main>
  );
}
