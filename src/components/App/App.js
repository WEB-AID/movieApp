import React from 'react';
import './App.css';
import { formatDistanceToNow } from 'date-fns';
import { DatePicker } from 'antd';

import MovieApiService from '../../Services/movieApiService';
import MovieList from '../MovieList/MovieList';

export default class App extends React.Component {
  movieApiService = new MovieApiService();

  state = {
    list: [],
    genresList: [],
  };

  componentDidMount() {
    this.getList();
    this.getGenres();
  }

  getList() {
    this.movieApiService.getReturnTitleMovies().then((res) => {
      this.setState(() => {
        return {
          list: res,
        };
      });
    });
  }

  getGenres() {
    this.movieApiService.getGenresArr().then((body) =>
      this.setState(() => {
        return {
          genresList: body.genres,
        };
      })
    );
  }

  render() {
    return (
      <div>
        <header>
          <span>{formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
          <span>
            <DatePicker />
          </span>
        </header>
        <MovieList list={this.state.list} genresArr={this.state.genresList} />
      </div>
    );
  }
}
