import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  Main,
  Register,
  Login,
  Profile,
  Movies,
  SavedMovies,
  PageNotFound,
  AppContext,
  CurrentUserContext,
  auth,
  mainApi,
  moviesApi,
  InfoPopup,
  MESSAGES,
} from '../';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isSuccessAction, setSuccessAction] = useState(false);
  const [serverError, setServerError] = useState('');

  // 1. проверим токен +
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    let token = localStorage.getItem('JWT');
    if (token) {
      setIsLoading(true);
      auth.checkToken(token)
        .then(() => {
          setIsLogIn(true);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [isLogIn]);
  //2. получим данные пользователя
  useEffect(() => {
    if (!isLogIn) return;
    setIsLoading(true);
    mainApi.getUserInfoServer()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [isLogIn]);
  // //3. получим список фильмов
  function getMoviesServer() {
    if (!isLogIn) return;
    setIsLoading(true);
    moviesApi.getInitialCards()
      .then(res => localStorage.setItem('cards', JSON.stringify(res)))
      .catch((err) => {
        console.log(err);
        updataPopupData(false, MESSAGES.DEFAULT_ERROR);
      })
      .finally(() => setIsLoading(false));
    setIsLoading(true);
    mainApi.getFavoriteMovies()
      .then(res => localStorage.setItem('favoriteMovies', JSON.stringify(res)))
      .catch(err => {
        console.log(err);
        if (!err.includes('404(')) {
          updataPopupData(false, _handleError(err));
        }
      })
      .finally(() => setIsLoading(false))
  }
  //5. Зарегистрируемся
  const handleRegister = (inputData) => {
    setIsLoading(true);
    auth.register(inputData)
      .then(() => {
        navigate('/signin', { replace: false });
        handleAuthorization(inputData)
      })
      .then(() => updataPopupData(true, MESSAGES.REG_SUCCESS))
      .catch((err) => {
        console.log(err);
        updataPopupData(false, _handleError(err, 'reg'));
      })
      .finally(() => setIsLoading(false))
  }
  // 6. Авторизуемся
  const handleAuthorization = (authData) => {
    setIsLoading(true);
    auth.signIn(authData)
      .then(res => {
        res.token && localStorage.setItem('JWT', res.token);
        setIsLogIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        updataPopupData(false, _handleError(err, 'login'));
      })
      .finally(() => setIsLoading(false))
  }
  //7. Отредактируем пользователя
  function handleUpdateUser(dataUser) {
    setIsLogIn(true);
    mainApi.sendUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        updataPopupData(true, MESSAGES.UPDATE_SUCCESS);
      })
      .catch((err) => {
        console.log(err);
        updataPopupData(false, err.includes('409') ? MESSAGES.UPDATE_CONFLICT : MESSAGES.UPDATE_ERROR);
      })
      .finally(() => setIsLoading(false))
  }
  //8. Добавим в избранное или удалим из избранного
  function handleSetLikeCard(card, setIsfavoriteMovies, fromMoviePage, getCards) {
    let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    let isLiked = favoriteMovies ? favoriteMovies.some((i) => i.movieId === card.id) : false
    if (isLiked) {
      mainApi.unsetLikeCard(favoriteMovies.find(item => item.movieId === card.id)._id)
        .then(res => {
          favoriteMovies = JSON.stringify([...favoriteMovies.filter(item => item && item._id !== res._id)]);
          localStorage.setItem('favoriteMovies', favoriteMovies);
          if (fromMoviePage) {
            setIsfavoriteMovies(!isLiked)
          } else {
            getCards();
            //setFindingCards([]); //[([...favoriteMovies])]
          }
        })
        .catch((err) => {
          console.log(err);
          updataPopupData(false, _handleError(err));
        })
    } else {
      mainApi.setLikeCard(card)
        .then(res => {
          localStorage.setItem('favoriteMovies', JSON.stringify([res, ...favoriteMovies]));
          setIsfavoriteMovies(!isLiked);
        })
        .catch((err) => {
          console.log(err)
          updataPopupData(false, _handleError(err))
        })
    }
  }
  // 9. Разлогинимся
  function handleLogOut() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('favoriteMovies');
    localStorage.removeItem('cards');
    localStorage.removeItem('lastState');
    setIsLogIn(false);
  }
  //10. Закрыть все попапы
  function closeAllPopups() {
    setServerError('');
    setIsInfoPopupOpen(false);
  }

  //12. Установим данные попапа
  function updataPopupData(success, err) {
    setIsInfoPopupOpen(true);
    setSuccessAction(success);
    setServerError(err);
  }

  //13 Обработаем ошибки
  const _handleError = function (err, action = '') {
    let currentError = ''
    if (typeof (err) === typeof ({})) {
      currentError = MESSAGES.DEFAULT_ERROR;
      return currentError;
    }
    if (err.includes('401') || err.includes('400')) {
      if (action === 'reg') { currentError = MESSAGES.REG_ERROR }
      else if (action === 'login') { currentError = MESSAGES.LOGIN_ERROR }
      else { currentError = MESSAGES.OTHER_ERROR }
    }
    else if (err.includes('409')) { currentError = MESSAGES.REG_CONFLICT }
    else if (err.includes('500')) { currentError = MESSAGES.SERVER_ERROR }
    else if (err.includes('404')) { currentError = MESSAGES.SEARCH_NOT_ADDED }
    else if (err.includes('403')) { currentError = MESSAGES.CONFLICT_UNSET_LIKE }
    else { currentError = MESSAGES.OTHER_ERROR }
    return currentError;
  }

  return (
    <div className='app'>
      <AppContext.Provider value={{ isLoading, closeAllPopups, serverError }}>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route exact path='/' element={<Main isLogIn={isLogIn} />} />
            <Route exact path='/signup'
              element={<ProtectedRoute
                element={Register}
                isLogIn={!isLogIn}
                onSubmit={handleRegister}
              />} />
            <Route exact path='/signin'
              element={<ProtectedRoute
                element={Login}
                isLogIn={!isLogIn}
                onSubmit={handleAuthorization}
              />} />
            <Route exact path='/profile'
              element={<ProtectedRoute
                element={Profile}
                isLogIn={isLogIn}
                onLogOut={handleLogOut}
                onUpdateUser={handleUpdateUser}
              />}
            />
            <Route exact path='/movies'
              element={<ProtectedRoute
                element={Movies}
                isLogIn={isLogIn}
                onSetLikeCard={handleSetLikeCard}
                getMoviesServer={getMoviesServer}
              />}
            />
            <Route exact path='/saved-movies'
              element={<ProtectedRoute
                element={SavedMovies}
                isLogIn={isLogIn}
                onSetLikeCard={handleSetLikeCard}
              />}
            />
            <Route exact path='*' element={<PageNotFound isLogIn={isLogIn} />} />
          </Routes>
          <InfoPopup
            isOpen={isInfoPopupOpen}
            isSuccess={isSuccessAction}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
