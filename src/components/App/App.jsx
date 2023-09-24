import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Main,
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
         messages,
        } from '../';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isLogIn, setIsLogIn ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ cards, setCards] = useState([]);
  const [ favoriteMovies, setFavoriteMovies] = useState([]);
  const [ isInfoPopupOpen, setIsInfoPopupOpen]  = useState(false);
  const [ isSuccessAction, setSuccessAction]  = useState(false);
  const [ serverError, setServerError]  = useState('');

  const _handleError = function (err, action = '') {
    let currentError = ''
    if (err.includes('401') || err.includes('403')) {
      if (action === 'reg') {currentError = messages.reg_error}
      else if (action === 'login') {currentError = messages.login_error}
      else {currentError = messages.other_error}
    }
    else if (err.includes('409')) {currentError = messages.reg_conflict}
    else if (err.includes('500')) {currentError = messages.server_error}
    else {currentError = messages.other_error}
    return currentError;
  }

  // 1. проверим токен +
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    let token = localStorage.getItem('JWT');
    if (token) {
      setIsLoading(true);
      auth.checkToken(token)
        .then(() => {
          setIsLogIn(true);
          navigate(pathname);
        })
        .catch(console.error)
        .finally(setIsLoading(false));
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
      .finally(setIsLoading(false))
  }, [isLogIn]);
  //3. получим список фильмов
  useEffect(() => {
    if (!isLogIn) return;
    setIsLoading(true);
    moviesApi.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.error)
      .finally(setIsLoading(false))
  }, [isLogIn]);
  //4. получим список избранного
  useEffect(() => {
    if (!isLogIn) return;
    setIsLoading(true);
    mainApi.getFavoriteMovies()
      .then((res) => {
        setFavoriteMovies(res);
      })
      .catch(console.error)
      .finally(setIsLoading(false))
  }, [isLogIn]);
  //5. Зарегистрируемся
  function handleRegister(inputData) {
    setIsLoading(true);
    auth.register(inputData)
      .then(() => {
        setServerError(messages.reg_success);
        setSuccessAction(true);
        setIsInfoPopupOpen(true);
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
        setServerError(_handleError(err, 'reg'));
        setSuccessAction(false);
        setIsInfoPopupOpen(true);
      })
      .finally(setIsLoading(false))
      console.log('три');
  }
  // 6. Авторизуемся
  function handleAuthorization(authData) {
    setIsLoading(true);
    auth.signIn(authData)
      .then(res => {
        res.token && localStorage.setItem('JWT', res.token);
        setServerError('');
        setIsLogIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setServerError(_handleError(err, 'login'));
        setSuccessAction(false);
        setIsInfoPopupOpen(true);
      })
      .finally(setIsLoading(false))
      console.log('четыре');
  }
  //7. Отредактируем пользователя
  function handleUpdateUser(dataUser) {
    setIsLogIn(true);
    mainApi.sendUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        setServerError(messages.update_success);
        setSuccessAction(true);
        setIsInfoPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setServerError(err.includes('409') ? messages.update_conflict : messages.update_error);
        setSuccessAction(false);
        setIsInfoPopupOpen(true);
      })
      .finally(() => setIsLoading(false))
      console.log('шесть');
  }
  //8. Добавим в избранное или удалим из избранного
  function handleSetLikeCard(card, isLiked) {
    setIsLoading(true);
    if (isLiked) {
      mainApi.unsetLikeCard(card._id)
        .then(res => {
          const updateList = favoriteMovies.filter(item => item && item._id !== res._id );
          setFavoriteMovies(updateList);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      mainApi.setLikeCard(card)
        .then(res => {setFavoriteMovies([res, ...favoriteMovies])})
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
    console.log('семь');
  }
  // 9. Разлогинимся
  const handleLogOut = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('dataUser');
    setIsLogIn(false);
  }
  //10. Закрыть все попапы
  function closeAllPopups() {
    setIsInfoPopupOpen(false);
  }

  //11. Внутренний универсальный обработчик
  // function handleRequest(request) {
  //   setIsLoading(true);
  //   request()
  //     .then(closeAllPopups)
  //     .catch(console.error)
  //     .finally(() => setIsLoading(false));
  // }

  return (
    <div className='app'>
      <AppContext.Provider value={{ isLoading, closeAllPopups, serverError }}>
        <CurrentUserContext.Provider value={ currentUser }>
          <Routes>
            <Route exact path='/' element={<Main isLogIn={isLogIn} />} />
            <Route exact path='/signup'
              element={<Register
                onSubmit={handleRegister}
              />} />
            <Route exact path='/signin'
              element={<Login
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
                cards={cards}
                favoriteMovies={favoriteMovies}
                onSetLikeCard={handleSetLikeCard}
              />}
            />
            <Route exact path='/saved-movies'
              element={<ProtectedRoute
                element = {SavedMovies}
                isLogIn = {isLogIn}
                favoriteMovies={favoriteMovies}
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
