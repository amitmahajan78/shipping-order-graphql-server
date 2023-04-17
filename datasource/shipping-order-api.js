const { RESTDataSource } = require('@apollo/datasource-rest');

class ShippingOrderAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:4010/api/v1/order-processing/';
  }

  willSendRequest(_path, request) {
    request.headers['authorization'] =
      'Bearer ' + process.env.SHIPPING_ORDER_API_TOKEN;
  }

  getShippingOrders(shippingOrderLookupReq) {
    return this.post('shipping_order/search', { body: shippingOrderLookupReq });
  }

  async getShippingOrderById(shippingOrderId) {
    return this.get(`shipping_order/uuid/${shippingOrderId}`);
  }
}

module.exports = ShippingOrderAPI;
