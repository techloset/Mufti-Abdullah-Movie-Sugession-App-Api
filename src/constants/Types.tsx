export type CardsType = {
  id: number;
  vote_average: number;
  poster_path: string;
  name: string;
  original_title: string;
  backdrop_path: string;
  overview: string;
};

export type CardProps = {
  imageUrl: string;
  movieId?: number;
  rating: number;
  name?: string;
};
