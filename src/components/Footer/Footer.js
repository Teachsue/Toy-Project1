import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="item">
          <p className="bottomBorderBox">SJG 커뮤니케이션</p>
          <div>
            <p className="guideText">
              제품, 서비스, 이벤트 등 다양한 소식을 받아 볼 수 있도록 이메일을
              구독해주세요.
            </p>
            <div className="inputBox">
              <input type="checkbox" name="check1" />
              <label htmlFor="checkText">본인은 14세 이상입니다.(필수)</label>
            </div>
            <div className="inputBox">
              <input type="checkbox" name="check2" />
              <label htmlFor="checkText">
                개인정보수집 및 이용에 동의합니다(필수)
              </label>
            </div>
            <p className="description">
              SJG는 SJG의 제품, 서비스 및 홍보 행사 관련 정보를 마케팅 목적으로,
              고객님이 동의하시고 해지하기 전까지, 고객님께 이메일로
              보내드립니다. 마케팅 목적의 개인정보 수집 및 이용에 동의하지
              않으셔도 되고, 그러한 경우, 마케팅 정보를 수령하실 수 없습니다.
            </p>
            <div className="inputBox">
              <input type="checkbox" name="check3" />
              <label htmlFor="checkText">
                마케팅 정보 수신에 동의합니다(필수)
              </label>
            </div>
            <div className="description">
              뉴스레터 이메일을 통한 광고성 정보 수신에 동의합니다.
            </div>
            <div className="emailInput">
              <input
                type="text"
                placeholder="이메일주소"
                className="footerInput"
              />
              <button type="button" className="footer-Btn">
                ⇨
              </button>
            </div>
          </div>
        </div>
        <div className="item">
          <p className="bottomBorderBox">주문 및 지원</p>
          {ORDER_SUPPORT.map(el => (
            <p className="guideText" key={el.id}>
              {el.name}
            </p>
          ))}
        </div>
        <div className="item">
          <p className="bottomBorderBox">서비스</p>
          {SERVICE.map(el => (
            <p className="guideText" key={el.id}>
              {el.name}
            </p>
          ))}
        </div>
        <div className="item">
          <p className="bottomBorderBox">위치 기본 설정</p>
          {LOCATION.map(el => (
            <p className="guideText" key={el.id}>
              {el.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

const ORDER_SUPPORT = [
  { id: 1, name: '문의하기' },
  { id: 2, name: '자주 묻는 질문' },
  { id: 3, name: '배송' },
  { id: 4, name: '반품' },
  { id: 5, name: '배송 조회하기' },
  { id: 6, name: '주문내역' },
  { id: 7, name: '이용 약관' },
];
const SERVICE = [
  { id: 1, name: '기업체 구매' },
  { id: 2, name: '페이셜 이포인트먼트' },
  { id: 3, name: '1:1 채팅 상담' },
  { id: 4, name: '타일 체험 캠페인' },
];
const LOCATION = [
  { id: 1, name: '배송:' },
  { id: 2, name: '대한민국' },
  { id: 3, name: '언어:' },
  { id: 4, name: '한국어' },
];
