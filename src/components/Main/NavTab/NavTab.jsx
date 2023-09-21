import './NavTab.css';

function NavTab() {
  return (
    <nav className='nav-tab' aria-label='Навигационные ссылки титульной страницы'>
      <ul className="nav-tab__links">
        <li><a className="nav-tab__link" href="#about-project">Узнать больше</a></li>
      </ul>
    </nav>
  );
};

export default NavTab;
