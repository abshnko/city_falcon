export interface IStory {
  imageUrls: string[];
  title: string;
  domain_cached_logo_url: string;
  category: string;
  domain_name: string;
  publishTime: string;
  score: number;
  description: string;
  url: string;
}

export interface StoriesProps {
  stories: IStory[];
}
