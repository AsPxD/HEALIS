export interface Author {
  name: string;
  avatar: string;
  verified: boolean;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
  views: string;
  likes: string;
  duration: string;
  author: Author;
}