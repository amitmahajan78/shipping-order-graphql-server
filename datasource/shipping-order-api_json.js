const { shippingOrder } = require('./shipping_order_data.json');

class ShippingOrderAPI {
  getShippingOrders() {
    console.log('Datasource getShippingOrders :: ' + shippingOrder);
    return shippingOrder;
  }

  getShippingOrderById(shippingOrderId) {
    console.log('Datasource getShippingOrderById :: ' + shippingOrder);
    return shippingOrder.find((l) => l.shippingOrderId === shippingOrderId);
  }
}

module.exports = ShippingOrderAPI;
