import { APIResponse } from "@/app/types/types";

export function extractFormattedData(data: APIResponse[], categoryId: number): any | null {
    const categoryData = data.filter(
      (category: any) => category.category_id == categoryId
    );

    if (!categoryData || !categoryData[0] || !categoryData[0].views) {
      return null;
    }

    // console.log('what data looks like', categoryData);

    const formatCount = (val: string) => {
      let count = parseInt(val);
      let unit = '';

      if (count >= 1000000000000) {
        // check if count is in trillions
        count = Math.round(count / 100000000000) / 10; // round to nearest trillion
        unit = 'T'; // set unit to "t" for trillions
      } else if (count >= 1000000000) {
        count = Math.round(count / 100000000) / 10;
        unit = 'B';
      } else if (count >= 1000000) {
        count = Math.round(count / 100000) / 10;
        unit = 'M';
      } else if (count >= 1000) {
        count = Math.round(count / 100) / 10;
        unit = 'K';
      }

      return `${count}${unit}`;
    };

    return {
      views: formatCount(categoryData[0].views.toString()),
      videos: formatCount(categoryData[0].videos.toString()),
      likes: formatCount(categoryData[0].likes.toString()),
    };
  }