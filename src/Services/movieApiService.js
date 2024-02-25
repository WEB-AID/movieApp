export default class MovieApiService {
  apiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzhmZjgwM2UyMTQ1ODYxMDEwZTZjNzI1ZWFhOTA0MiIsInN1YiI6IjY1YTI3ZTI1NDk3NTYwMDEzMTliMTAxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PBgbbElOzAot0ALFpv_-iA3Qbn98OvVFaWo_5jadwU8';

  apiOptions = {
    headers: {
      Authorization: `Bearer ${this.apiToken}`,
    },
  };

  async getReturnTitleMovies(value, page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=${page}`,
      this.apiOptions
    );
    const resFinal = await res.json();
    return resFinal;
  }

  async getGenresArr() {
    const URL = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const getResource = await fetch(URL, this.apiOptions);
    const res = await getResource.json();
    return res;
  }

  async createGuestSession() {
    const URL = 'https://api.themoviedb.org/3/authentication/guest_session/new';
    const getResource = await fetch(URL, this.apiOptions);
    const res = await getResource.json();
    return res;
  }

  async addRating(starsValue, guestSessionId, movieId) {
    const token = 'ac8ff803e2145861010e6c725eaa9042';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: starsValue }),
    };
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${token}&guest_session_id=${guestSessionId}`;
    const postResource = await fetch(URL, options);
    const res = await postResource.json();
    return res;
  }

  async getRatedMovies(guestSessionId, page) {
    const token = 'ac8ff803e2145861010e6c725eaa9042';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token,
      },
    };
    const URL = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${token}&&page=${page}`;
    const getList = await fetch(URL, options);
    const res = await getList.json();
    return res;
  }
}
