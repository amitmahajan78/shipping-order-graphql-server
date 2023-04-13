const resolvers = {
  Query: {
    shippingOrders: (_, { shippingOrderLookupReq }, { dataSources }) => {
      // console.log("resolver :: "+ dataSources.shippingOrderAPI.getShippingOrders())
      return dataSources.shippingOrderAPI.getShippingOrders(
        shippingOrderLookupReq
      );
    },
    shippingOrder: (_, { shippingOrderId }, { dataSources }) => {
      console.log('resolver :: ' + shippingOrderId);
      return dataSources.shippingOrderAPI.getShippingOrderById(shippingOrderId);
    },
  },
  ShippingOrder: {
    __resolveReference: ({ id }, { dataSources }) => {
      return dataSources.shippingOrderAPI.getShippingOrderById(id);
    },
  },
};

module.exports = resolvers;
