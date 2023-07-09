import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MAIN_CONTENTS_LIST } from './mainContentsData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import './Main.scss';

const Main = () => {
  const [slidePx, setSlidePx] = useState({});

  const porcelainContentPx = 420;
  const wallFoolrContentPx = 245;

  const porcelainMaxSlidePx = -1200;
  const wallFoolrMaxSlidePx = -850;

  const toPrev = id => {
    const newSlidePx =
      (slidePx[id] || 0) + (id === 1 ? porcelainContentPx : wallFoolrContentPx);
    if (newSlidePx <= 0) {
      setSlidePx(prevState => ({
        ...prevState,
        [id]: newSlidePx,
      }));
    }
  };

  const toNext = id => {
    const newSlidePx =
      (slidePx[id] || 0) - (id === 1 ? porcelainContentPx : wallFoolrContentPx);
    const maxSlidePx = id === 1 ? porcelainMaxSlidePx : wallFoolrMaxSlidePx;

    if (newSlidePx >= maxSlidePx) {
      setSlidePx(prevState => ({
        ...prevState,
        [id]: newSlidePx,
      }));
    }
  };

  return (
    <main className="Main">
      <div className="container">
        <div className="mainVisual">
          <div className="left">
            <div className="logo">
              <img src="./images/logo.png" alt="logo" />
            </div>
            <div className="text">
              <p>끊임없는 연구와 투자로 인한</p>
              <p>“우수한 품질과 높은 강도”</p>
              <p>변색 걱정없는 반영구성</p>
            </div>
          </div>
          <div className="right bgImg">
            <img src="./images/mv_2.jpeg" alt="mv" />
          </div>
        </div>
        <div className="mainContents">
          {MAIN_CONTENTS_LIST.map(info => (
            <div key={info.id}>
              <section className={info.SlideClassName}>
                <div className="text">
                  <p className="discriptTitle">{info.SlideDiscriptTitle}</p>
                  <p className="discriptText">{info.SlideDiscriptText}</p>
                  <p className="itemStory">{info.SlideItemStory}</p>
                  <Link to="/" className="textButton">
                    <button>
                      <span>{info.kind} 보러가기</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </Link>
                </div>
                <div className="slideBox">
                  <ul className="productBox">
                    {info.SlideProductList.map(product => (
                      <li
                        className="product"
                        key={product.id}
                        style={{
                          transform: `translateX(${slidePx[info.id] || 0}px)`,
                        }}
                      >
                        <img src={product.img} alt={product.name} />
                        <p>{product.name}</p>
                        <span>{product.type}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="slideBtn prevBtn"
                    onClick={() => toPrev(info.id)}
                  >
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="slideBtnArrow"
                    />
                  </button>
                  <button
                    className="slideBtn nextBtn"
                    onClick={() => toNext(info.id)}
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="slideBtnArrow"
                    />
                  </button>
                </div>
              </section>

              <section className={info.SceneClassName}>
                <div className="sceneBox">
                  <div className="scene">
                    <img src={info.SceneImg} alt="현장이미지" />
                  </div>
                </div>
                <div className="text">
                  <p className="discriptTitle">{info.SceneDiscriptTitle}</p>
                  <p className="discriptText">{info.SceneDiscriptText}</p>
                  <p className="itemStory">{info.SceneItemStory}</p>
                  <Link to="/" className="textButton">
                    <button>
                      <span>{info.kind} 시공사례 보러가기</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </Link>
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Main;
