'use client';
import { Inter } from '@next/font/google';
import { AiFillYoutube } from 'react-icons/ai';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <section className=" h-100 bg-gradient-to-b from-gray-700 to-gray-900 min-h-screen">
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
      </section>
    </main>
  );
}
