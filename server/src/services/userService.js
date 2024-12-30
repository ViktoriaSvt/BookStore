const { Cart } = require("../models/Cart");
const { User } = require("../models/User"); // Use CommonJS require
const { verifyToken } = require("./authService");


async function getUserById(id) {
  const user = await User.findById(id);
  return user
}


async function getUser(token, res) {

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
}

const userData = verifyToken(token);
const user = await getUserById(userData._id);

return user;

}

async function getCart(cartId) {
  const cart = Cart.findById(cartId)
  return cart;
}

module.exports = { getUserById, getUser , getCart}

