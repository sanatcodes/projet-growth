import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className=" mt-10 px-10">{children}</main>
    </>
  );
}
