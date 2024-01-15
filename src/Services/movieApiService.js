export default class MovieApiService {
  apiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzhmZjgwM2UyMTQ1ODYxMDEwZTZjNzI1ZWFhOTA0MiIsInN1YiI6IjY1YTI3ZTI1NDk3NTYwMDEzMTliMTAxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PBgbbElOzAot0ALFpv_-iA3Qbn98OvVFaWo_5jadwU8';

  apiOptions = {
    headers: {
      Authorization: `Bearer ${this.apiToken}`,
    },
  };

  async getReturnTitleMovies() {
    const res = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=the&include_adult=false&language=en-US&page=1',
      this.apiOptions
    );
    const resFinal = await res.json();
    return resFinal.results;
  }

  async getGenresArr() {
    const URL = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const getResource = await fetch(URL, this.apiOptions);
    const res = await getResource.json();
    return res;
  }
}
