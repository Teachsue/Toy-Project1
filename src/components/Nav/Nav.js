import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
  const [isHovering, setIsHovering] = useState(true);
  const [selectedMainMenuType, setSelectedMainMenuType] = useState('');

  const navigate = useNavigate();

  const handleMouseOver = type => {
    setSelectedMainMenuType(type);
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setSelectedMainMenuType('');
    setIsHovering(false);
  };

  const token = localStorage.getItem('TOKEN');

  const onLogoutSubmit = () => {
    localStorage.removeItem('TOKEN');
    navigate('/');
  };

  const checkTokenAndRedirect = (e, path) => {
    if (!token) {
      e.preventDefault();
      navigate('/users/signin');
      alert('로그인을 먼저 진행해 주세요.');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="nav scroll">
      <div className="cateroryName">
        <ul className="mainMenu">
          <li className="logo">
            <Link to="/">
              <span>SJG</span>
            </Link>
          </li>

          {MAIN_MENU_LIST.map(info => (
            <li
              className="menulist"
              key={`menu-list-${info.id}`}
              onMouseOver={() => handleMouseOver(info.type)}
              onMouseOut={handleMouseOut}
            >
              <Link to={info.link}>{info.text}</Link>
            </li>
          ))}
        </ul>
        <ul className="utilMenu">
          {token ? (
            <li className="menulist" onClick={onLogoutSubmit}>
              <Link to="/">LOGOUT</Link>
            </li>
          ) : (
            <li className="menulist">
              <Link to="/users/signin">LOGIN</Link>
            </li>
          )}
          <li className="menulist">
            <Link to="/carts" onClick={e => checkTokenAndRedirect(e, '/carts')}>
              CART
            </Link>
          </li>
        </ul>
      </div>
      {selectedMainMenuType && (
        <div className="subCateroryName">
          {SUB_CATEGORY_LIST.map(info => (
            <ul
              className={`${info.className} ${
                isHovering && selectedMainMenuType === info.type ? 'on' : ''
              }`}
              key={info.id}
              onMouseOver={() => handleMouseOver(info.type)}
              onMouseOut={handleMouseOut}
            >
              {info.titleList.map(info => (
                <li className="menulist" key={info.id}>
                  <Link to={`/goods/category/${info.id}`}>{info.text}</Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default Nav;

const MAIN_MENU_LIST = [
  { id: 1, link: '/', text: 'PORCELAIN TILE', type: 'PORCELAIN' },
  { id: 2, link: '/', text: 'WALL TILE', type: 'WALL' },
  { id: 3, link: '/', text: 'FLOOR TILE', type: 'FLOOR' },
];

const SUB_CATEGORY_LIST = [
  {
    id: 1,
    className: 'porcelainTile',
    type: 'PORCELAIN',
    titleList: [
      { id: 1, text: '600X600X10MM' },
      { id: 2, text: '600X1200X20MM' },
      { id: 3, text: '600X1200X11MM' },
      { id: 4, text: '600X600X20MM' },
      { id: 5, text: '400X800X11MM' },
      { id: 10, text: '시공사례' },
    ],
  },
  {
    id: 2,
    className: 'wallTile',
    type: 'WALL',
    titleList: [
      { id: 6, text: '300X600MM' },
      { id: 7, text: '200X600MM' },
      { id: 11, text: '시공사례' },
    ],
  },
  {
    id: 3,
    className: 'floorTile',
    type: 'FLOOR',
    titleList: [
      { id: 8, text: '300X300MM' },
      { id: 9, text: '200X400MM' },
      { id: 12, text: '시공사례' },
    ],
  },
];
