const { ctrlWrapper } = require("../../helpers");
const addOrder = require("./addOrder")

module.exports = {
  addOrder: ctrlWrapper(addOrder),
};