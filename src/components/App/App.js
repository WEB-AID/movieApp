import React from 'react';
import './App.css';
import { Spin, Alert, message } from 'antd';

import MovieApiService from '../../Services/movieApiService';
import MovieList from '../MovieList/MovieList';
import SearchLine from '../SearchLine/SearchLine';

export default class App extends React.Component {
  movieApiService = new MovieApiService();

  constructor(props) {
    super(props);
    this.getList = this.getList.bind(this);
    this.inputRequestFilms = this.inputRequestFilms.bind(this);
  }

  state = {
    list: [],
    genresList: [],
    isLoading: true,
    isListLoading: true,
    error: false,
    pages: null,
    page: 1,
    value: 'the',
  };

  componentDidMount() {
    this.getList(this.state.value);
    this.getGenres();
    this.checkNetworkStatus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.value !== this.state.value) {
      this.getList(this.state.value);
    }
  }

  async getList(value) {
    try {
      const res = await this.movieApiService.getReturnTitleMovies(value, this.state.page);
      this.setState(() => ({
        list: res.results,
        pages: res.total_pages,
        error: false,
      }));
    } catch {
      this.setState(() => ({
        list: [],
        error: true,
      }));
    }

    this.setState(() => {
      return {
        isListLoading: false,
      };
    });
  }

  onPageChanged = (page) => {
    this.setState(() => ({
      page,
    }));
  };

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

  inputRequestFilms(value) {
    if (value === '') {
      this.setState(() => ({
        value: 'the',
        page: 1,
      }));
    } else {
      this.setState(() => ({
        value,
      }));
    }

    this.setState(() => {
      return {
        isListLoading: true,
      };
    });
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
          <SearchLine inputRequestFilms={this.inputRequestFilms} />
        </header>
        {this.state.isListLoading ? (
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        ) : null}
        {this.state.list.length === 0 ? (
          <Alert message="Error" description="No such MOVIES!" type="error" showIcon />
        ) : null}
        <MovieList
          list={this.state.list}
          genresArr={this.state.genresList}
          pages={this.state.pages}
          onChange={this.onPageChanged}
          current={this.state.page}
        />
      </div>
    );
  }
}
