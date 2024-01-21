import React from 'react';

import MovieItem from '../MovieItem/MovieItem';
import Pagination from '../Pagination/Pagination';

import './MovieList.css';

export default function MovieList(props) {
  const { list, genresArr, pages, onChange, current } = props;

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

  return (
    <div>
      <ul className="movieList">{elements}</ul>
      <Pagination
        basic
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
        pages={pages}
        onChange={onChange}
        current={current}
      />
    </div>
  );
}
