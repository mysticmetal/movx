/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import TopProgressLoader from './TopProgressLoader'; 

import { addSearchHistory, clearSearchHistory } from '../../actions/searchActions';
import logo from '../../images/logo.png';

const Navigation = (props) => {
  const [searchQuery, setQuery] = useState('');
  const searchHistory = useRef(null);
  const navigation = useRef(null);
  const searchInput = useRef(null);
  const toggler = useRef(null);
  const menu = useRef(null);
  const searchMenu = useRef(null);
  const { recentSearch, isLoading } = useSelector(state => ({
    recentSearch: state._search.recentSearch,
    isLoading: state._misc.isLoading
  }));
  const dispatch = useDispatch();

  const onInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  const onSubmitQuery = () => {
    if (searchQuery) {
      searchInput.current.blur();
      searchMenu.current.classList.remove('open');
      props.history.push(`/search/movie/${searchQuery}`);
      if (!recentSearch.includes(searchQuery.toLowerCase())) {
        dispatch(addSearchHistory(searchQuery.toLowerCase()));
      }
    }
  };

  const onFocusChange = () => {
    if (recentSearch.length >= 1) {
      searchHistory.current.classList.add('visible');
    }
  };

  const onBlurChange = () => {
    if (recentSearch.length >= 1) {
      searchHistory.current.classList.remove('visible');
    }
  };

  const onKeyEnter = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      onSubmitQuery();
    }
  };

  const onNavigationToggle = () => {
    searchMenu.current.classList.remove('open');
    toggler.current.classList.toggle('open');
    menu.current.classList.toggle('open');
  };

  const onSearchToggle = () => {
    searchMenu.current.classList.toggle('open');
    toggler.current.classList.remove('open');
    menu.current.classList.remove('open');
  };

  const onClickLink = (e) => {
    const current = e.target;
    if (current.nodeName === 'A') {
      toggler.current.classList.remove('open');
      menu.current.classList.remove('open');
      searchMenu.current.classList.remove('open');
      window.scrollTo(undefined, 0);
    }
  };
  
  const onClearHistory = () => {
    dispatch(clearSearchHistory());
  };  

  window.addEventListener('scroll', () => {
    if (window.pageYOffset === 0) {
      navigation.current.style.background = 'transparent';
      navigation.current.style.boxShadow = 'none';
    } else {
      navigation.current.style.background = '#050607';
      navigation.current.style.boxShadow = '0 8px 20px rgba(0,0,0,.1)';  
    }
  });

  return (
    <React.Fragment>
      <TopProgressLoader isLoading={isLoading} />
      <div 
          className="navigation"
          onClick={onClickLink}
          ref={navigation}
      >
        <div className="navigation__wrapper">
          <div 
              className="navigation__toggle"
              onClick={onNavigationToggle}
              ref={toggler}
          >
            <div/><div/><div/>
          </div>
          <div className="navigation__logo">
            <Link to="/">
              <img src={logo} alt=""/>
            </Link>
          </div>
          <div className="navigation__menu-wrapper">
            <div 
                className="navigation__menu" 
                ref={menu}
            >
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link"
                  exact
                  strict
                  to="/" 
              >
                  Home
              </NavLink>
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link"
                  exact
                  strict
                  to="/trending" 
              >
                Trending
              </NavLink>
              <div className="navigation__dropdown">
                <NavLink 
                    activeClassName="navigation__active"
                    className="navigation__link navigation__dropdown-item"
                    exact
                    strict
                    to="/discover" 
                >
                  Discover
                </NavLink>
                <div className="navigation__dropdown-wrapper">
                  <Link to="/popular">
                    Popular
                  </Link>
                  <Link to="/upcoming">
                    Upcoming
                  </Link>
                  <Link to="/top_rated">
                    Top Rated
                  </Link>
                </div>
              </div>
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link desktop-none"
                  exact
                  strict
                  to="/popular" 
              >
                Popular
              </NavLink>
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link desktop-none"
                  exact
                  strict
                  to="/top_rated" 
              >
                Top Rated
              </NavLink>
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link desktop-none"
                  exact
                  strict
                  to="/upcoming" 
              >
                Upcoming
              </NavLink>
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link"
                  exact
                  strict
                  to="/tv" 
              >
                TV Shows
              </NavLink>
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link"
                  exact
                  strict
                  to="/people" 
              >
                People
              </NavLink>
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link"
                  exact
                  to="/genre" 
              >
                Genres
              </NavLink>
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link"
                  exact
                  strict
                  to="/favorites" 
              >
                Favorites
              </NavLink>
            </div>
            <div className="navigation__search" ref={searchMenu}>
              <input 
                  autoComplete="off"
                  className="search__input"
                  onBlur={onBlurChange}
                  onChange={onInputChange}
                  onFocus={onFocusChange}
                  onKeyPress={onKeyEnter}
                  placeholder="Search for movie, tv show, or people"
                  ref={searchInput}
                  type="text" 
                  value={searchQuery}
              />
              <button 
                  className="search-clear clear--button"
                  onClick={() => {
                    setQuery('');
                    searchInput.current.focus();
                  }}
                  style={{
                    display: searchQuery ? 'block' : 'none'
                  }}
              >
                x
              </button>
              <button 
                  className="button--link button--search search__button"
                  onClick={onSubmitQuery}
              >
                <div/>
              </button>
              {recentSearch.length >= 1 && (
                <div 
                    className="search-history"
                    ref={searchHistory}
                >
                  <div className="search-history-action">
                    <p>Recent Searches</p>
                    <button 
                        className="search-clear"
                        onClick={onClearHistory}
                    >
                      Clear
                    </button>  
                  </div>
                  {props.recentSearch.map((search, index) => (
                    <Link 
                        key={search + index}
                        onClick={() => { setQuery(search); }}
                        to={`/search/movie/${search}`} 
                    >

                      {search}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button 
              className="button--link button--search search__toggle"
              onClick={onSearchToggle}
          >
            <div/>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navigation;