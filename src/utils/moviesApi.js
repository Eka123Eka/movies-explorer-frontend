import baseUtils from './baseUtils';

class MoviesApi extends baseUtils {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }

  getInitialCards() {
    return this._request('/beatfilm-movies', { headers: this._headers }, 'GET getInitialCards - ');
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  },
});

export default moviesApi;
