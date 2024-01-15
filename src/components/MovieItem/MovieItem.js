import React from 'react';
import { format } from 'date-fns';
import { Button } from 'antd';

import MovieApiService from '../../Services/movieApiService';

import './MovieItem.css';

function formatWithDateFns(dateString) {
  const datesArr = dateString.split('-');
  const fixedDatesArr = datesArr.map((el) => Number(el));
  return format(new Date(...fixedDatesArr), 'd MMM yyyy');
}

function cutText(text, cutSize) {
  let res = text.slice(0, cutSize);
  res += '...';
  return res;
}

export default class MovieItem extends React.Component {
  movieApiService = new MovieApiService();

  state = {};

  #imgURL = `https://image.tmdb.org/t/p/original${this.props.imgUrl}`;

  render() {
    const { name, date, genre, text, genreList } = this.props;
    const genresNamesArr = genre.map((elem) => {
      const matchingObject = genreList.find((obj) => obj.id === elem);
      return (
        <Button key={matchingObject.id} className="movieGerneBtn" size="small">
          {matchingObject.name}
        </Button>
      );
    });

    return (
      <li className="movieCard">
        <img className="filmImg" src={this.#imgURL} loading="lazy" alt="" />
        <div className="movieDescription">
          <h1>{name}</h1>
          <div className="movieDate">{formatWithDateFns(date)}</div>
          <div className="movieGenres">{genresNamesArr}</div>
          <div className="movieText">{cutText(text, 150)}</div>
        </div>
      </li>
    );
  }
}
