import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="mx-20 my-12">{children}</main>
    </>
  );
}
