import React from 'react';
import './App.css';
import { Spin, Alert, message } from 'antd';

import MovieApiService from '../../Services/movieApiService';
import MovieList from '../MovieList/MovieList';
import Header from '../Header/Header';
import { MovieApiServiceProvider } from '../movieApiService-context/movieApiService-context';

export default class App extends React.Component {
  movieApiService = new MovieApiService();

  cookieName = 'MovieDBSession';

  constructor(props) {
    super(props);
    this.getList = this.getList.bind(this);
    this.inputRequestFilms = this.inputRequestFilms.bind(this);
  }

  state = {
    list: [],
    activeSearch: true,
    genresList: [],
    isLoading: true,
    isListLoading: true,
    error: false,
    results: null,
    page: 1,
    ratedPage: 1,
    value: 'the',
    guestSessionID: null,
  };

  componentDidMount() {
    this.getList(this.state.value);
    this.getGenres();
    this.checkNetworkStatus();
    this.getGuestSessionId();
  }

  componentDidUpdate(pP, prevState) {
    if (prevState.page !== this.state.page || prevState.value !== this.state.value) {
      this.getList(this.state.value);
    }

    if (prevState.ratedPage !== this.state.ratedPage) {
      this.getRatedList(this.state.value);
    }

    if (this.state.activeSearch !== prevState.activeSearch) {
      if (this.state.activeSearch === false) this.getRatedList();
      if (this.state.activeSearch === true) this.getList();
    }
  }

  async getList(value = 'the') {
    try {
      const res = await this.movieApiService.getReturnTitleMovies(value, this.state.page);
      this.setState(() => ({
        results: res.total_results,
        list: res.results,
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

  async getRatedList() {
    this.setState(() => {
      return {
        isListLoading: true,
      };
    });

    try {
      const res = await this.movieApiService.getRatedMovies(this.state.guestSessionID, this.state.ratedPage);
      this.setState(() => {
        return {
          results: res.total_results,
          list: res.results,
          error: false,
        };
      });
    } catch {
      this.setState(() => {
        return {
          list: [],
          error: true,
        };
      });
    }

    this.setState(() => {
      return {
        isListLoading: false,
      };
    });
  }

  onPageChanged = (page) => {
    if (this.state.activeSearch) {
      this.setState(() => ({
        page,
      }));
    } else {
      this.setState(() => ({
        ratedPage: page,
      }));
    }
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

  getGuestSessionId() {
    if (localStorage.getItem(this.cookieName) === null) {
      this.movieApiService.createGuestSession().then((body) => {
        this.setState(() => {
          return {
            guestSessionID: body.guest_session_id,
          };
        });
        localStorage.setItem(this.cookieName, body.guest_session_id);
      });
    } else {
      const sessionId = localStorage.getItem(this.cookieName);
      this.setState(() => {
        return {
          guestSessionID: sessionId,
        };
      });
    }
  }

  changeListMode = (key) => {
    if (key === 'Search') {
      this.setState({
        activeSearch: true,
      });
    }
    if (key === 'Rated') {
      this.setState({
        activeSearch: false,
      });
    }
  };

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
      <div className="mainWrapper">
        <Header
          changeListMode={this.changeListMode}
          inputRequestFilms={this.inputRequestFilms}
          activeSearch={this.state.activeSearch}
        />
        {this.state.isListLoading ? (
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        ) : null}
        {this.state.list.length === 0 ? (
          <Alert message="Error" description="No such MOVIES!" type="error" showIcon />
        ) : null}
        <MovieApiServiceProvider value={this.state.genresList}>
          <MovieList
            list={this.state.list}
            results={this.state.results}
            onChange={this.onPageChanged}
            current={this.state.activeSearch ? this.state.page : this.state.ratedPage}
            guestSessionID={this.state.guestSessionID}
          />
        </MovieApiServiceProvider>
      </div>
    );
  }
}
