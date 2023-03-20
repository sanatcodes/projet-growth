import VerticalCategories from '@/app/categories/[id]/components/verticalCategories';

export default function CategoryDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <div className=" bg-purple-600">
        {/* @ts-ignore */}
        <VerticalCategories />
      </div>
      <section className="flex-1">{children}</section>
    </main>
  );
}
