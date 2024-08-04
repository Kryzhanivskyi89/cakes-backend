const { model, Schema } = require('mongoose');

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name of client'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone of client'],
    },
    
    description: {
      type: String,
      required: [true, 'Descript your order'],
    },
    
  },
  { versionKey: false, timestamps: true }
);

const Order = model('Order', orderSchema);

module.exports = Order;