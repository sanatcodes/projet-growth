export interface Category {
    id: string;
    snippet: {
      title: string;
    };
  }

export interface Props {
    categories: Category[];
  }
