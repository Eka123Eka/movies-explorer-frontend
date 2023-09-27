const MESSAGES = {
  LOGIN_ERROR: 'Вы ввели неправильный логин или пароль.',
  REG_SUCCESS: 'Вы успешно зарегистрировались!',
  REG_ERROR: 'При регистрации пользователя произошла ошибка.',
  REG_CONFLICT: 'Пользователь с таким email уже существует.',
  UPDATE_SUCCESS: 'Данные пользователя успешно обновлены.',
  UPDATE_ERROR: 'При обновлении профиля произошла ошибка.',
  UPDATE_CONFLICT: 'Пользователь с таким email уже существует.',
  SERVER_ERROR: 'На сервере произошла ошибка.',
  OTHER_ERROR: 'Возникла непредвиденная ошибка.',
  SEARCH_ERROR: 'Произошла ошибка. На сервере нет ни одной карточки.',
  SEARCH_NOT_FOUND: 'По вашему запросу ничего не нашлось.',
  SEARCH_NOT_ADDED: 'Вы не добавили ни одной карточки',
  EMPTY_QUERY: 'Введите строку поиска',
  CONFLICT_UNSET_LIKE: 'Эту карточку нельзя удалить. Она выбрана другим пользователем.',
  DEFAULT_ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
}

const CONST_FOR_MOVIES = {
  DURATION: 40,
  WIDTH_ONE_CARD: 723,
  WIDTH_TWO_CARD: 865,
  WIDTH_TREE_CARD: 1155,
  CARDS_ON_320: 5,
  CARDS_ON_768: 8,
  CARDS_ON_1000: 12,
  CARDS_ON_1280: 16,
  CARDS_ADD_320: 2,
  CARDS_ADD_768: 2,
  CARDS_ADD_1000: 3,
  CARDS_ADD_1280: 4,
  BASEURL: 'https://api.nomoreparties.co/',
  REGEX_NAME: /^[a-zA-Zа-яА-Я\sё-]+$/,
  REGEX_EMAIL: /^[\S]+@[\S]+\.[\w]{2,2}$/i,
}

export {
  MESSAGES,
  CONST_FOR_MOVIES
};
