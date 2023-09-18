import { Route, Routes, useLocation } from 'react-router-dom';
import { Main,
         Register,
         Login,
         Profile,
         Movies,
         SavedMovies,
         PageNotFound } from '../';
import './App.css';

function App() {
  const { pathname } = useLocation();
  let isLogIn = false;
  pathname === '/' ? isLogIn = false : isLogIn = true;
  return (
    <div className='app'>
      <Routes>
        <Route exact path='/' element={<Main isLogIn={isLogIn} />} />
        <Route exact path='/signup' element={<Register />} />
        <Route exact path='/signin' element={<Login />} />
        <Route exact path='/profile' element={<Profile isLogIn={isLogIn} />} />
        <Route exact path='/movies' element={<Movies isLogIn={isLogIn} />} />
        <Route exact path='/saved-movies' element={<SavedMovies isLogIn={isLogIn} />} />
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
