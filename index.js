const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const { readFileSync } = require('fs');
const gql = require('graphql-tag');

const typeDefs = gql(
  readFileSync('./shipping-order.graphql', { encoding: 'utf-8' })
);
const resolvers = require('./resolvers');
const ShippingOrderAPI = require('./datasource/shipping-order-api');

require('dotenv').config();
async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const port = 4001;
  const subgraphName = 'shippingOrder';

  try {
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {
            shippingOrderAPI: new ShippingOrderAPI(),
          },
        };
      },
      listen: { port },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();
