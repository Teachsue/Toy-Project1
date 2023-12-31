const { userService } = require('../services');

const signUp = async (req, res) => {
  try {
    const { typeId, name, email, password, account } = req.body;

    if (!name || !email || !password) {
      const error = new Error(
        'KEY_ERROR: Missing required fields: name, email, password.'
      );
      error.statusCode = 400;
      throw error;
    }

    if (typeId !== 1 && !account) {
      const error = new Error('KEY_ERROR: Missing required field.');
      error.statusCode = 400;
      throw error;
    }

    await userService.signUp(typeId, name, email, password, account);

    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { typeId, email, account, password } = req.body;

  try {
    let accessToken;
    const userTypeEnum = Object.freeze({
      NORMAL_USER: 1,
      BUSINESS_OWNER: 2,
      CORPORATION: 3,
    });

    if (typeId === userTypeEnum.NORMAL_USER) {
      accessToken = await userService.signInWithEmail(email, password);
    } else {
      accessToken = await userService.signInWithAccount(account, password);
    }

    res.status(200).json({ message: 'SIGNIN_SUCCESS', accessToken });
  } catch (error) {
    res.status(error.statusCode || 401).json({ message: error.message });
  }
};

const orderDetail = async function (req, res) {
  try {
    const userId = req.user;
    const result = await userService.getOrderList(userId);

    return res.status(200).json({ data: result });
  } catch (err) {
    console.error(err);
    return await res
      .status(err.statusCode || 400)
      .json({ message: err.message });
  }
};

const getUserInfomation = async function (req, res) {
  try {
    const userId = req.user;
    const result = await userService.getMyAccount(userId);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return await res
      .status(err.statusCode || 400)
      .json({ message: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
  orderDetail,
  orderDetail,
  getUserInfomation,
};
