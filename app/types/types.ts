export type Category = {
    id: string;
    snippet: {
      title: string;
    };
  }

export type Props =  {
    categories: Category[];
  }

export type APIResponse = {
  _id: string;
  trending_date: string;
  category_id: string;
  views: number;
  likes: number;
  comment_count: number;
  videos: number;
}

export type CategoryDetailDonut = {
  category_id: string;
  name: string;
  views: number;
  likes: number;
  videos: number;
}

export type CategoryDetailBubble = {
  category_id: string;
  views: number;
  likes: number;
  videos: number;
  trending_date: string;
}

