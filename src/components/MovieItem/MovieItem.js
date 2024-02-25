import React from 'react';
import { format } from 'date-fns';
import { Button, Rate } from 'antd';

import MovieApiService from '../../Services/movieApiService';
import { MovieApiServiceConsumer } from '../movieApiService-context/movieApiService-context';

import './MovieItem.css';

function formatWithDateFns(dateString) {
  const datesArr = dateString.split('-');
  const fixedDatesArr = datesArr.map((el) => Number(el));
  return format(new Date(...fixedDatesArr), 'd MMM yyyy');
}

function cutText(text, cutSize) {
  if (text.length <= cutSize) {
    return text;
  }

  const lastSpaceIndex = text.lastIndexOf(' ', cutSize);
  let truncatedText = text.slice(0, lastSpaceIndex);
  truncatedText += '...';

  return truncatedText;
}

function getRatingColor(value) {
  let color;

  const colors = ['#E90000', '#E97E00', '#E9D100', '#66E900'];

  if (value >= 0 && value < 3) {
    color = colors[0];
  }

  if (value >= 3 && value < 5) {
    color = colors[1];
  }

  if (value >= 5 && value < 7) {
    color = colors[2];
  }

  if (value >= 7) {
    color = colors[3];
  }

  return {
    borderColor: color,
  };
}

export default class MovieItem extends React.Component {
  movieApiService = new MovieApiService();

  state = {
    rateValue: null,
  };

  #imgURL = `https://image.tmdb.org/t/p/original${this.props.imgUrl}`;

  popularity = this.props.rating.toFixed(1);

  componentDidUpdate(_, prevState) {
    if (prevState.rateValue !== this.state.rateValue) {
      this.movieApiService.addRating(this.state.rateValue, this.props.guestSessionID, this.props.movieId);
    }
  }

  onValueChanged = (value) => {
    this.setState(() => ({
      rateValue: value,
    }));
    localStorage.setItem(this.props.movieId, value);
  };

  render() {
    const { name, date, genre, text, movieId } = this.props;

    return (
      <MovieApiServiceConsumer>
        {(value) => {
          const genresNamesArr = genre.map((elem) => {
            const matchingObject = value.find((obj) => obj.id === elem);
            return (
              <Button key={matchingObject.id} className="movieGerneBtn" size="small">
                {matchingObject.name}
              </Button>
            );
          });

          const rate = localStorage.getItem(movieId);

          return (
            <li className="movieCard">
              <img className="filmImg" src={this.#imgURL} loading="lazy" alt="" />
              <div className="movieDescription">
                <div className="ratingCircle" style={getRatingColor(this.popularity)}>
                  <span>{this.popularity}</span>
                </div>
                <h1>{name}</h1>
                <div className="movieDate">{formatWithDateFns(date)}</div>
                <div className="movieGenres">{genresNamesArr}</div>
                <div className="movieText">{cutText(text, 60)}</div>
                <Rate
                  className="rating"
                  onChange={this.onValueChanged}
                  defaultValue={rate || 0}
                  count={10}
                  style={{ fontSize: 14 }}
                />
              </div>
            </li>
          );
        }}
      </MovieApiServiceConsumer>
    );
  }
}
