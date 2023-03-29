import { APIResponse, Category } from '@/app/types/types';
import { categoryIcons } from '@/utils/dictionaries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default async function VerticalCategories() {
  const today = new Date().toISOString().slice(0, 10);
  const currentData = await fetch(
    `https://floating-hollows-40011.herokuapp.com/category/${today}`
  );
  const categories = await currentData.json();

  return (
    <div className=" flex flex-col px-5 h-full mt-10">
      {categories.map((category: APIResponse) => (
        <Link
          key={category.category_id}
          href={`/categories/${category.category_id}`}
        >
          <button className="flex flex-col items-center justify-center py-2 pl-4 pr-2 text-left text-black hover:text-gray-300 focus:outline-none focus:text-gray-900 w-full">
            <div className="h-6 w-6 mr-3">
              <FontAwesomeIcon
                className="text-2xl mr-2"
                icon={categoryIcons[parseInt(category.category_id)][0]}
                color="white"
              />
            </div>
            <h3 className="text-center text-md text-white">
              {categoryIcons[parseInt(category.category_id)][1]}
            </h3>
          </button>
        </Link>
      ))}
    </div>
  );
}
