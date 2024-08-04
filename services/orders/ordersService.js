const Order = require("../../models/orders");

class OrdersService {
  static async addOrder(orderData) {
    return Order.create(orderData);
  }
}

module.exports = {OrdersService};