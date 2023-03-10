import './globals.css';
import Link from 'next/link';
import { AiFillYoutube } from 'react-icons/ai';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <nav className="bg-gray-800 p-6 flex justify-between">
          <Link href="/">
            <div className=" flex flex-row items-center gap-2">
              <AiFillYoutube
                className=" w-8 h-8"
                style={{ color: '#8D47D3' }}
              />
              <h1 className=" text-xl">Project Growth</h1>
            </div>
          </Link>
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
        {children}
      </body>
    </html>
  );
}
