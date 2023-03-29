'use client';
import { Inter } from '@next/font/google';
import { AiFillYoutube } from 'react-icons/ai';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <section className=" h-full bg-gradient-to-b from-gray-700 to-gray-900 min-h-screen">
        <div>
          <div className="  flex flex-col  pt-20 justify-center items-center">
            <div className=" text-7xl flex flex-row gap-5 items-center">
              <AiFillYoutube style={{ color: '#8D47D3' }} />
              <h1 className="text-5xl">Project Growth</h1>
            </div>
            <h3 className=" text-lg">
              Predicting and measuring creative trends
            </h3>

            <Link href="/categories">
              <button className=" bg-purple-500 p-3 rounded-md mt-10 ">
                Explore Categories
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-end fixed bottom-10 w-full gap-10">
          <Link href="categories/10" className="relative">
            <div className="bg-blue-300 rounded-full w-44 h-44 z-10">
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
                Music
              </span>
            </div>
          </Link>
          <Link href="categories/1" className="relative">
            <div className="bg-yellow-300 rounded-full w-40 h-40 -ml-6">
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
                Film & Animation
              </span>
            </div>
          </Link>
          <Link href="categories/19" className="relative">
            <div className="bg-orange-500 rounded-full w-36 h-36 -ml-6">
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
                Travel & Events
              </span>
            </div>
          </Link>
          <a href="categories/23" className="relative">
            <div className="bg-pink-300 rounded-full w-40 h-40 -ml-6">
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
                Comedy
              </span>
            </div>
          </a>
          <a href="categories/20" className="relative">
            <div className="bg-green-400 rounded-full w-44 h-44 -ml-6">
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
                Gaming
              </span>
            </div>
          </a>
        </div>
      </section>
    </main>

    // 24, 20, 16
  );
}
