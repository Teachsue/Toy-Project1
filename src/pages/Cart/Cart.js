import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.scss';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [weights, setTotalWeight] = useState(0);
  const [prices, setTotalPrice] = useState(0);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    fetch('http://192.168.219.100:3000/carts', {
      method: 'GET',
      headers: {
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setOriginalItems(data.data);
        const updatedData = data.data.map(item => ({
          ...item,
          count: item.quantity,
          weight: item.weight * item.quantity,
          price: item.price * item.quantity,
        }));
        setItems(updatedData);
        setTotalWeight(calculateTotalWeight(updatedData));
        setTotalPrice(calculateTotalPrice(updatedData));
      });
  }, []);

  const handleOrder = () => {
    const orderItems = items.map(item => ({
      productId: item.productId,
      quantity: item.count,
    }));
    fetch('http://192.168.219.100:3000/carts', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ products: orderItems }),
    })
      .then(res => res.json())
      .catch(error => {
        alert('Network error while processing order', error);
      });
  };

  const handleDelete = (productId, cartId) => {
    const newItems = onRemove(cartId);
    setItems(newItems);
    setTotalWeight(calculateTotalWeight(newItems));
    setTotalPrice(calculateTotalPrice(newItems));

    fetch('http://192.168.219.100:3000/carts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ productId: productId }),
    })
      .then(res => res.json())
      .catch(error => {
        alert('Network error while processing order', error);
      });
  };

  const decrease = (items, cartId) => {
    return items.map(item =>
      item.cartId === cartId && item.count > 1
        ? {
            ...item,
            count: item.count - 1,
            weight:
              originalItems.find(i => i.cartId === cartId).weight *
              (item.count - 1),
            price:
              originalItems.find(i => i.cartId === cartId).price *
              (item.count - 1),
          }
        : item
    );
  };

  const increase = (items, cartId) => {
    return items.map(item =>
      item.cartId === cartId
        ? {
            ...item,
            count: item.count + 1,
            weight:
              originalItems.find(i => i.cartId === cartId).weight *
              (item.count + 1),
            price:
              originalItems.find(i => i.cartId === cartId).price *
              (item.count + 1),
          }
        : item
    );
  };

  const handleDecrease = cartId => {
    const newItems = decrease(items, cartId);
    setItems(newItems);
    setTotalWeight(calculateTotalWeight(newItems));
    setTotalPrice(calculateTotalPrice(newItems));
  };

  const handleIncrease = cartId => {
    const newItems = increase(items, cartId);
    setItems(newItems);
    setTotalWeight(calculateTotalWeight(newItems));
    setTotalPrice(calculateTotalPrice(newItems));
  };

  const calculateTotalWeight = items => {
    return items.reduce((total, data) => total + Number(data.weight), 0);
  };

  const calculateTotalPrice = items => {
    return items.reduce((total, data) => total + Number(data.price), 0);
  };

  const showAlert = weights > 1000;

  const onRemove = cartId => {
    return items.filter(data => data.cartId !== cartId);
  };

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

  return (
    <div className="cart">
      <div className="container">
        <h1>CART</h1>
        <div className="cartBox">
          <ul className="cartTitle">
            {CART_TITLE.map(info => (
              <li key={info.id}>{info.name}</li>
            ))}
          </ul>
          {items.length === 0 && (
            <div className="cartEmpty">
              <p>장바구니가 비었습니다.</p>
            </div>
          )}
          {items.length !== 0 && (
            <div className="cartListBox">
              {items.map(el => (
                <ul className="cartList" key={el.cartId}>
                  <li>{el.kindId}</li>
                  <li>{findSize(el.surfaceTypeId)}</li>
                  <li>{el.tileName}</li>
                  <li>{Number(el.weight)}</li>
                  <li>
                    <div className="count">
                      <div className="countInput">
                        <button onClick={() => handleDecrease(el.cartId)}>
                          -
                        </button>
                        <div className="countInputText">{el.count}</div>
                        <button
                          onClick={() => handleIncrease(el.cartId)}
                          disabled={showAlert || items.length === 0}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>{Number(el.price)} 원</li>
                  <li className="deletBtn">
                    <button
                      onClick={() => handleDelete(el.productId, el.cartId)}
                    >
                      X
                    </button>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
        <div className="right">
          <div className="totalBox">
            <ul className="totalTitle">
              {TOTAL_TITLE.map(info => (
                <li key={info.id}>{info.name}</li>
              ))}
            </ul>
            <ul className="totalList">
              <li className="totalKg">{Number(weights)}</li>
              <li className="totalAmount">{Number(prices)}</li>
            </ul>
            <div className="weightLimitTextBox">
              {showAlert && (
                <p className="weightLimitText">
                  무게는 1000Kg 이상 구매하실 수 없습니다.
                </p>
              )}
            </div>
          </div>
          <ul className="buttonBox">
            <li>
              <Link to="/">
                <button className="blackBtn">메인으로</button>
              </Link>
            </li>
            <li>
              <button
                className="blackBtn"
                onClick={() => window.history.back()}
              >
                이전으로
              </button>
            </li>
            <li>
              <Link to="/orders">
                <button
                  className="blackBtn"
                  disabled={showAlert || items.length === 0}
                  onClick={handleOrder}
                >
                  주문하기
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;

const CART_TITLE = [
  { id: 1, name: '종류' },
  { id: 2, name: '사이즈' },
  { id: 3, name: '상품명' },
  { id: 4, name: 'Kg' },
  { id: 5, name: '수량' },
  { id: 6, name: '금액' },
  { id: 7, name: '상품삭제' },
];

const TOTAL_TITLE = [
  { id: 1, name: '전체 Kg' },
  { id: 2, name: '전체 금액' },
];
