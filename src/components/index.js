import App from './App/App';
import HeaderButton from './Header/HeaderButton/HeaderButton';
import Header from './Header/Header';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Movies from './Movies/Movies';
import MoviesCard from './Movies/MoviesCard/MoviesCard';
import MoviesCardList from './Movies/MoviesCardList/MoviesCardList';
import Preloader from './Movies/Preloader/Preloader';
import SearchForm from './Movies/SearchForm/SearchForm';
import SavedMovies from './SavedMovies/SavedMovies';
import PageNotFound from './PageNotFound/PageNotFound';
import AboutMe from './Main/AboutMe/AboutMe';
import AboutProject from './Main/AboutProject/AboutProject';
import NavTab from './Main/NavTab/NavTab';
import Portfolio from './Main/Portfolio/Portfolio';
import Promo from './Main/Promo/Promo';
import Techs from './Main/Techs/Techs';
import { CurrentUserContext, AppContext } from './../contexts';
import {auth, mainApi, moviesApi, messages, const_for_movies} from './../utils';
import InfoPopup from './Popups/InfoPopup';
import { useForm, usePopupClose, useFormValidation }  from './hooks';

export {
  App,
  HeaderButton,
  Header,
  Logo,
  Navigation,
  Main,
  Footer,
  Register,
  Login,
  Profile,
  Movies,
  MoviesCard,
  MoviesCardList,
  Preloader,
  SearchForm,
  SavedMovies,
  PageNotFound,
  AboutMe,
  AboutProject,
  NavTab,
  Portfolio,
  Promo,
  Techs,
  CurrentUserContext,
  AppContext,
  auth,
  mainApi,
  moviesApi,
  InfoPopup,
  useForm,
  usePopupClose,
  useFormValidation,
  messages,
  const_for_movies,
};
