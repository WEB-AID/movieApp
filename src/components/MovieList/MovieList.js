import React from 'react';

import MovieItem from '../MovieItem/MovieItem';

import './MovieList.css';

export default function MovieList(props) {
  const { list, genresArr } = props;

  const elements = list.map((item) => (
    <MovieItem
      key={item.id}
      name={item.title}
      date={item.release_date}
      genre={item.genre_ids}
      genreList={genresArr}
      text={item.overview}
      imgUrl={item.poster_path}
    />
  ));

  return <ul className="movieList">{elements}</ul>;
}
