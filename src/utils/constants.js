const messages = {
  login_error: 'Вы ввели неправильный логин или пароль.',
  reg_success: 'Вы успешно зарегистрировались!',
  reg_error: 'При регистрации пользователя произошла ошибка.',
  reg_conflict: 'Пользователь с таким email уже существует.',
  update_success: 'Данные пользователя успешно обновлены.',
  update_error: 'При обновлении профиля произошла ошибка.',
  update_conflict: 'Пользователь с таким email уже существует.',
  server_error: 'На сервере произошла ошибка.',
  other_error: 'Возникла непредвиденная ошибка.',
  search_error: 'Произошла ошибка. На сервере нет ни одной карточки.',
  search_not_found: 'По вашему запросу ничего не нашлось.',
  search_not_added: 'Вы не добавили ни одной карточки',
  empty_query: 'Введите строку поиска',
  conflict_unsetLike: 'Эту карточку нельзя удалить. Она выбрана другим пользователем.',
  default_error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
}

const const_for_movies = {
  duration: 40,
  width_one_card: 723,
  width_two_card: 865,
  width_three_card: 1155,
  cards_on_320: 5,
  cards_on_768: 8,
  cards_on_1000: 12,
  cards_on_1280: 16,
  cards_add_320: 2,
  cards_add_768: 2,
  cards_add_1000: 3,
  cards_add_1280: 4,
  baseUrl: 'https://api.nomoreparties.co/',
  regEX_name: /^[a-zA-Zа-яА-Я\sё-]+$/,
}

export {
  messages,
  const_for_movies
};
