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