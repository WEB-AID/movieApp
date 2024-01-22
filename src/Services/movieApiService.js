export default class MovieApiService {
  apiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzhmZjgwM2UyMTQ1ODYxMDEwZTZjNzI1ZWFhOTA0MiIsInN1YiI6IjY1YTI3ZTI1NDk3NTYwMDEzMTliMTAxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PBgbbElOzAot0ALFpv_-iA3Qbn98OvVFaWo_5jadwU8';

  apiOptions = {
    headers: {
      Authorization: `Bearer ${this.apiToken}`,
    },
  };

  // requestToken = 'baa2868775887a23dfe98ee3fe64977088151ab1';

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
}
