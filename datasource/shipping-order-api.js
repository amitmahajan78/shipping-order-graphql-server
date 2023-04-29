const { RESTDataSource } = require('@apollo/datasource-rest');
var request = require('request');
var accessToken;
class ShippingOrderAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.SHIPPING_ORDER_API_ENDPOINT;
  }

  willSendRequest(_path, request) {
    this.getAuth0Token();
    request.headers['authorization'] = 'Bearer ' + accessToken;
  }

  getAuth0Token() {
    var accessTokenBody;
    const body = {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: 'http://logistics/resource/app',
      grant_type: 'client_credentials',
    };
    var options = {
      method: 'POST',
      url: 'https://thesaastech.eu.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      accessTokenBody = JSON.parse(body);
      accessToken = accessTokenBody.access_token;
    });

    return accessToken;
  }

  getShippingOrders(shippingOrderLookupReq) {
    return this.post('shipping_order/search', { body: shippingOrderLookupReq });
  }

  async getShippingOrderById(shippingOrderId) {
    return this.get(`shipping_order/uuid/${shippingOrderId}`);
  }
}

module.exports = ShippingOrderAPI;
