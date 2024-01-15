import React from 'react';
import './App.css';
import { formatDistanceToNow } from 'date-fns';
import { DatePicker, Spin, Alert, message } from 'antd';

import MovieApiService from '../../Services/movieApiService';
import MovieList from '../MovieList/MovieList';

export default class App extends React.Component {
  movieApiService = new MovieApiService();

  state = {
    list: [],
    genresList: [],
    isLoading: true,
    error: false,
  };

  componentDidMount() {
    this.getList();
    this.getGenres();
    this.checkNetworkStatus();
  }

  async getList() {
    try {
      const res = await this.movieApiService.getReturnTitleMovies();
      this.setState(() => ({
        list: res,
        error: false,
      }));
    } catch {
      this.setState(() => ({
        list: [],
        error: true,
      }));
    }
  }

  getGenres() {
    this.movieApiService.getGenresArr().then((body) =>
      this.setState(() => {
        return {
          genresList: body.genres,
          isLoading: false,
        };
      })
    );
  }

  checkNetworkStatus() {
    if (!navigator.onLine) {
      message.error('There is connection problem. Please - check your Internet connection.');
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      );
    }

    if (this.state.error) {
      return <Alert message="Error" description="Fetch request Error, please reload the page!" type="error" showIcon />;
    }

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
