import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './ProductDetail.scss';
import Count from '../../components/Count/Count';

const ProductDetail = ({ productId }) => {
  const navigate = useNavigate();
  const [countNumber, setCount] = useState(1);
  const [product, setProduct] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    fetch(`http://192.168.219.100:3000/goods/name/${name}`)
      .then(res => res.json())
      .then(data => setProduct(data.data));
  }, [name]);

  let totalPrice = 0;
  let totalWeight = 0;

  if (product && product.length > 0) {
    totalWeight = (product[0].weight * countNumber).toLocaleString();
    totalPrice = (product[0].price * countNumber).toLocaleString();
  }

  const showAlert = product ? product[0]?.weight * countNumber > 1000 : 1;

  const surface_type = ['Matt', 'Hard Matt', 'Soft Matt', 'LappaTo', 'Glossy'];
  const sub_categories = [
    '600x600x10mm',
    '600x600x20mm',
    '600x1200x11mm',
    '600x1200x20mm',
    '400x800x11mm',
    '300x600x9mm',
    '200x600x9mm',
    '300x300x9mm',
    '200x400x9mm',
  ];

  const findSize = subCategoryId => {
    const foundSizes = sub_categories.filter(
      (size, index) => index + 1 === subCategoryId
    );
    return foundSizes.length > 0 ? foundSizes[0] : '';
  };

  const subCategoryId = product[0]?.sub_category_id;
  const size = findSize(subCategoryId);

  const newSize = size.replace('mm', '').split('x10');

  const thick = size.split('x')[2];

  const findSurfaceType = surfaceTypeId => {
    const foundTypes = surface_type.filter(
      (type, index) => index + 1 === surfaceTypeId
    );
    return foundTypes.length > 0 ? foundTypes[0] : '';
  };

  const surfaceTypeId = product[0]?.surface_type_id;
  const surfaceType = findSurfaceType(surfaceTypeId);

  const token = localStorage.getItem('TOKEN');

  const checkToken = (e, product) => {
    if (!token) {
      e.preventDefault();
      navigate('/users/signin');
      alert('로그인을 먼저 진행해 주세요.');
    } else {
      createCart(product, token);
    }
  };

  const createCart = () => {
    fetch('http://192.168.219.100:3000/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
      body: JSON.stringify({
        productId: product[0]?.id,
        quantity: countNumber,
      }),
    }).then(res => {
      if (res.status === 200) {
        navigate('/carts');
      } else if (res.status === 400) {
        navigate('/users/signin');
      }
    });
  };
  return (
    <div className="productDetail">
      {product.map(el => (
        <div className="productBox" key={el.id}>
          <div className="itemImageBox">
            <img
              src={el.image_url}
              alt="productImage"
              className="productImage"
            />
          </div>
          <div className="productDescription">
            <h1 className="productName">{el.name}</h1>
            <p className="mainDescription">{el.description}</p>
            <ul className="descriptionBox">
              <li className="usingType">
                <div>TYPE</div>
                <p className="itemUsingType">{surfaceType}</p>
              </li>
              <li className="usingType">
                <div>SIZE</div>
                <p className="itemUsingType">{newSize}</p>
              </li>
              <li className="usingType">
                <div>THICKNESS</div>
                <p className="itemUsingType">{thick}</p>
              </li>
              <li className="usingType">
                <div>WEIGHT</div>
                <p className="itemUsingType">{el.weight} kg</p>
              </li>
            </ul>
            <div className="productCountBox">
              <Count
                countNumber={countNumber}
                setCount={setCount}
                isDisabled={showAlert}
              />
              <div className="totalResult">
                <div className="totalPrice">{totalPrice}원</div>
                <div className="totalPrice">{totalWeight}Kg</div>
              </div>
            </div>
            {showAlert && (
              <div className="alertTextBox">
                <p className="alertText">
                  무게는 1000Kg 이상 구매하실 수 없습니다.
                </p>
              </div>
            )}
            <button
              type="submit"
              className="saveCart"
              disabled={totalWeight > 1000}
              onClick={e => checkToken(e, product)}
            >
              장바구니에 담기
            </button>
          </div>
        </div>
      ))}
      <div className="productExample">
        <div className="constructionText">
          <h1 className="constructionTitle">SJG TILE 시공 방법</h1>
          <h3>페데스탈 시공</h3>
          <h3>BUILD PEDESTAL</h3>
          <p className="exampleText">
            바닥청소 → 수평확인 및 기준점 셋팅 → 페데스탈 조립 및 배열 → 마감재
            시공
          </p>
          <p className="exampleText">테라스, 데크, 수경시설, 옥상바닥 추천</p>
        </div>
        <div className="constructionWay">
          <img
            src="/images/constructWay1.png"
            alt="testCase"
            className="testCase"
          />
        </div>
      </div>
      <div className="productExample">
        <div className="constructionWay">
          <img
            src="/images/constructWay2.png"
            alt="testCase"
            className="testCase"
          />
        </div>
        <div className="constructionText">
          <h1 className="constructionTitle">SJG TILE 시공 방법</h1>
          <h3>페데스탈 시공</h3>
          <h3>BUILD PEDESTAL</h3>
          <p className="exampleText">
            바닥청소 → 수평확인 및 기준점 셋팅 → 페데스탈 조립 및 배열 → 마감재
            시공
          </p>
          <p className="exampleText">테라스, 데크, 수경시설, 옥상바닥 추천</p>
        </div>
      </div>
      <div className="productTableBox">
        <table className="productInformation">
          {TABLE_TITLE.map(el => (
            <tr className="column-left" key={el.id}>
              {el.text}
            </tr>
          ))}
        </table>
        <table className="productInformation">
          {TABLE_CONTENT.map(el => (
            <tr className="column-right" key={el.id}>
              {el.text}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;

const TABLE_TITLE = [
  { id: '1', text: '꺾임 강도(Bending Strength)' },
  { id: '2', text: '' },
  { id: '3', text: '흡수율(Water Absorption)' },
  { id: '4', text: '내마모성(Abrasion Resistance)' },
  { id: '5', text: '내균열성(Crazing Resistance)' },
  { id: '6', text: '내화확성(Chemical Resistance(Acid/Alkali))' },
  { id: '7', text: '내동해성(Freezing Damage Resistance)' },
  { id: '8', text: '미끄럼저항성(Slip Resistance Test: Wettability)' },
];

const TABLE_CONTENT = [
  { id: '1', text: '200N/cm이상(9.0이상)' },
  { id: '2', text: '1200N/cm이상(20.0이상)' },
  { id: '3', text: '0.5% 이하' },
  { id: '4', text: '0.05g 이하' },
  { id: '5', text: '2회 이상 무' },
  { id: '6', text: '이상없음(No Attack)' },
  { id: '7', text: '이상없음(No Attack)' },
  { id: '8', text: '0.4 이상' },
];
