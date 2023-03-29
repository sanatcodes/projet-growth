import VerticalCategories from './components/VerticalCategories';

export default function CategoryDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <div className=" bg-purple-600 h-screen">
        {/* @ts-ignore */}
        <VerticalCategories />
      </div>
      <section className="flex-1">{children}</section>
    </main>
  );
}
