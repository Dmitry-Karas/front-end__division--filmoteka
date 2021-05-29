import { BASE_URL, API_KEY } from './common/constants';
const axios = require('axios');

export default class NewFetchApiImage {
  constructor() {
    this.url = BASE_URL;
    this.key = API_KEY;
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchApiFilms() {
    return await axios(`${this.url}search/movie?api_key=${this.key}&query=${this.searchQuery}`);
  }

  async fetchApiPopularFilms() {
    return await axios(
      `${this.url}movie/popular?sort_by=popularity.desc&api_key=${this.key}&language=en-US&page=${this.page}`,
    );
  }

  async fetchGenreList() {
    return await axios(`${this.url}genre/movie/list?api_key=${this.key}`);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPageNum() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
