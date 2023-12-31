const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('../node_modules/nodemailer');

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plaintextPassword, saltRounds);
};

const signUp = async (typeId, name, email, password, account) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/;
  const accountRegex = /^[0-9]{10}$/;

  if (typeId === 1) {
    if (!emailRegex.test(email)) {
      const error = new Error('INVALID_USER_EMAIL');
      error.statusCode = 400;
      throw error;
    }

    if (!passwordRegex.test(password)) {
      const error = new Error('INVALID_USER_PASSWORD');
      error.statusCode = 400;
      throw error;
    }
  } else {
    if (account && !accountRegex.test(account)) {
      const error = new Error('INVALID_USER_ACCOUNT');
      error.statusCode = 400;
      throw error;
    }
  }

  const hashedPassword = await hashPassword(password);
  const createUser = await userDao.createUser(
    typeId,
    name,
    email,
    hashedPassword,
    account
  );
  sendEmail(email);
  return createUser;
};

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = function (userEmail) {
  const mailOptions = {
    from: 'jseongnam1109@gmail.com',
    to: userEmail,
    subject: 'WELCOME TO SJG',
    html: `<div
    style="
      width: 70vw;
      height: 50vh;
      background: #fffef2;
      border: 3px solid #333;
      padding: 1em;
      margin: 2em auto;
    "
  >
    <div
      style="
        border: 2px solid #331;
        width: 70vw;
        height: 49vh;
      "
    >
      <p style="font-size: 30px; text-align:center; padding-top:2em">
        <strong>WELCOME TO SJG TILE!</strong>
      </p>
      <div style="line-height: 10px; text-align: center">
        <div style="margin-bottom: 50px; font-size: 16px; line-height: 15px">
          <p>ENJOY YOUR NEVER-EXPIRING WELCOME GIFT OF</p>
          <u style="font-weight: 800; font-size: 18px">10,000,000 WON</u>
          <p>YOU CAN USE IT AT ANY TIME.</p>
        </div>
        <div style="line-height: 15px">
          <p>SJG타일에 가입하신 것을 환영합니다!!.</p>
          <p>
            유효기간이 없는
            <u style="font-weight: 800; font-size: 18px">10,000,000포인트</u
            >를 지급했습니다.
          </p>
          <p>언제든 사용하세요!</p>
        </div>
      </div>
    </div>
  </div>`,
  };

  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

const signUpMail = async (newUser) => {
  try {
    const user = await userDao.createUserEmail(newUser);
    await sendEmail(user.email);
    return user;
  } catch (error) {
    throw error;
  }
};

const signInWithEmail = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user || Object.keys(user).length === 0) {
    const error = new Error('INVALID USER');
    error.statusCode = 404;
    throw error;
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const error = new Error('INVALID PASSWORD');
    error.statusCode = 401;
    throw error;
  }

  const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return accessToken;
};

const signInWithAccount = async (account, password) => {
  const accountUser = await userDao.getUserByAccount(account);

  if (!accountUser || accountUser.length === 0 || !accountUser[0].length) {
    const error = new Error('INVALID USER');
    error.statusCode = 404;
    throw error;
  }

  const isMatched = await bcrypt.compare(password, accountUser[0][0].password);

  if (!isMatched) {
    const error = new Error('INVALID PASSWORD');
    error.statusCode = 401;
    throw error;
  }

  const accessToken = jwt.sign(
    { userId: accountUser[0][0].id },
    process.env.JWT_SECRET,
    {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return accessToken;
};

const getOrderList = async function (userId) {
  const myOrderDetail = await userDao.orderlist(userId);
  return myOrderDetail;
};

const getMyAccount = async (userId) => {
  const myAccount = await userDao.myAccount(userId);
  return myAccount;
};

module.exports = {
  signUp,
  signInWithEmail,
  signInWithAccount,
  signUpMail,
  sendEmail,
  getOrderList,
  getMyAccount,
}
