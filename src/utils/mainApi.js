import baseUtils from './baseUtils';
import { CONST_FOR_MOVIES } from './constants';

class MainApi extends baseUtils {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }
  // 1. Вернем данные пользователяи
  getUserInfoServer() {
    return this._request('/users/me', { headers: this._headers }, `getUserInfo - `, true);
  }
  // 2. Вернем избранное
  getFavoriteMovies() {
    return this._request('/movies', { headers: this._headers }, `getFavoriteMovies - `, true);
  }
  // 3. Отредактируем пользователя
  sendUserInfo(dataUser) {
    return this._request('/users/me', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(dataUser)
    }, `PATCH ${dataUser.name}, ${dataUser.about} - `, true);
  }
  // 4. Добавим в избранное
  setLikeCard(card) {
    return this._request('/movies', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        year: card.year,
        image: `${CONST_FOR_MOVIES.BASEURL}/${card.image.url}`,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        movieId: card.id,
        country: card.country,
        director: card.director,
        duration: card.duration,
        thumbnail: `${CONST_FOR_MOVIES.BASEURL}/${card.image.formats.thumbnail.url}`,
        description: card.description,
        trailerLink: card.trailerLink,
      }),
    }, `POST ${card.id}, ${card.nameRU} - `, true);
  }
  // 5. Удалим из избранного
  unsetLikeCard(idCard) {
    return this._request(`/movies/${idCard}`, {
      headers: this._headers,
      method: 'DELETE',
    }, `DELETE ${idCard} - `, true);
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.elkod.nomoredomainsicu.ru',
  //baseUrl: 'http://127.0.0.1:3000',
  headers: {
    authorization: '',
    'Content-Type': 'application/json'
  },
});

export default mainApi;
