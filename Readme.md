PUBLISHING THE SUBGRAPHS WITH ROVER

APOLLO_KEY=your-graphs-apollo-key 
rover subgraph publish Shipping-Order-Super-Graph@current \
--name shippingOrder --schema ./shipping-order.graphql \
--routing-url http://localhost:4001