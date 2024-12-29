const { User } = require("../models/User"); // Use CommonJS require


async function getUserById(id) {
  const user = await User.findById(id).lean();
  return user
}


module.exports = { getUserById }

