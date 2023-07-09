import React, { useState, useEffect } from 'react';
import './Order.scss';
import OrderResult from '../OrderResult/OrderResult';

const Order = () => {
  let [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const token = localStorage.getItem('TOKEN');

  const surface_type = ['Matt', 'Hard Matt', 'Soft Matt', 'LappaTo', 'Glossy'];
  const sub_categories = [
    { id: 1, sizes: '600x600x10mm' },
    { id: 2, sizes: '600x600x20mm' },
    { id: 3, sizes: '600x1200x11mm' },
    { id: 4, sizes: '600x1200x20mm' },
    { id: 5, sizes: '400x800x11mm' },
    { id: 6, sizes: '300x600x9mm' },
    { id: 7, sizes: '200x600x9mm' },
    { id: 8, sizes: '300x300x9mm' },
    { id: 9, sizes: '200x400x9mm' },
  ];

  const findSize = subCategoryId => {
    return sub_categories.find(el => el.id === subCategoryId).sizes;
  };

  const findType = surfaceType => {
    const foundType = surface_type.filter(
      (type, idx) => idx + 1 === surfaceType
    );
    return foundType.length > 0 ? foundType[0] : '';
  };

  useEffect(() => {
    fetch(`http://192.168.219.100:3000/carts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setItems(data.data);
      });
  }, []);
  const totalWeight = items => {
    return items?.reduce(
      (acc, cur) => acc + Number(cur.weight) * Number(cur.quantity),
      0
    );
  };

  const totalPrice = items => {
    return items?.reduce(
      (acc, cur) => acc + Number(cur.price) * Number(cur.quantity),
      0
    );
  };

  const handleInputValue = e => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const postProduct = () => {
    fetch(`http://192.168.219.100:3000/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
      body: JSON.stringify({
        address: inputValues.address,
      }),
    }).then(res => {
      if (res.status === 200) {
        console.log(setModal(true));
        setModal(true);
      } else if (res.status === 402) {
        alert('결제에 실패하였습니다. 결제 포인트가 부족합니다.');
      }
    });
  };

  return (
    <div className="order">
      <div className="bigBox">
        <div className="buyerInfo">
          <h1>주문자 정보</h1>
          <p className="userInfo"> {items[0]?.name} 님</p>
          <div className="shippingAddress">
            <h2>주문을 어디로 보내시겠습니까?</h2>
            <div className="orderTypeName"> 이름</div>
            <input
              className="name input"
              name="name"
              placeholder="받으실 분 성함을 적어주세요"
              onChange={handleInputValue}
            />
            <div className="orderTypeName">주소</div>
            <input
              className="address input"
              placeholder="배송 상세주소를 적어주세요"
              name="address"
              onChange={handleInputValue}
            />
            <div className="orderTypeName">배송 요청</div>
            <input
              className="detailAddress input"
              placeholder="경비실에 맡겨주세요"
              name="memo"
              onChange={handleInputValue}
            />
          </div>
        </div>
        <div className="perchaseBox">
          <div className="payBox">
            <div className="indexBox">
              <p className="resultText"> 최종가격</p>
              <p className="resultText"> 총 무게</p>
            </div>
            <div className="final">
              <p className="resultText">{totalPrice(items)} 원</p>
              <p className="resultText">{totalWeight(items)} KG</p>
            </div>
          </div>
          <div className="total">
            {items.map(el => (
              <div className="item" key={el.cartId}>
                <img
                  src={el.imageUrl}
                  alt="perchaseProduct"
                  className="perchaseImage"
                />
                <div className="perchaseOption">
                  <p className="descriptionOption">{el.tileName}</p>
                  <p className="descriptionOption">
                    {findSize(el.surfaceTypeId)}
                  </p>
                  <p className="descriptionOption">
                    {findType(el.surfaceTypeId)}
                  </p>
                </div>
                <div className="perchaseOption">
                  <p className="descriptionOption">{el.quantity} 개</p>
                  <p className="descriptionOption">{el.weight} KG</p>
                  <p className="descriptionOption">{Number(el.price)} 원</p>
                </div>
              </div>
            ))}
          </div>
          <div className="buttonBox">
            <button
              type="submit"
              className="payment"
              onClick={() => {
                postProduct();
              }}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <div className="orederResultBox">
          <OrderResult
            className="orederResult"
            setModal={setModal}
            items={items}
            totalWeight={totalWeight(items)}
            totalPrice={totalPrice(items)}
            address={inputValues.address}
          />
        </div>
      )}
    </div>
  );
};
export default Order;
