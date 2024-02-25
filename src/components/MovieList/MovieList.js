import React from 'react';

import MovieItem from '../MovieItem/MovieItem';
import Pagination from '../Pagination/Pagination';

import './MovieList.css';

export default class MovieList extends React.Component {
  state = {};

  render() {
    const { list, results, onChange, current, guestSessionID } = this.props;

    const elements = list.map((item) => (
      <MovieItem
        key={item.id}
        movieId={item.id}
        guestSessionID={guestSessionID}
        name={item.title}
        date={item.release_date}
        genre={item.genre_ids}
        text={item.overview}
        imgUrl={item.poster_path}
        rating={item.vote_average}
      />
    ));

    return (
      <div>
        <ul className="movieList">{elements}</ul>
        <Pagination
          basic
          style={{
            width: '60%',
            justifyContent: 'center',
            marginBottom: '16px',
            display: 'inline-block',
          }}
          results={results}
          onChange={onChange}
          current={current}
        />
      </div>
    );
  }
}
