#!/usr/bin/env node

const server = require('express')();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const schema = buildSchema(fs.readFileSync(__dirname + '/../shared/graphql-schema.gql').toString());
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

const resolvers = {
  Query: {
    pid: () => process.pid,
    recipe: async (_obj, { id }) => {
      if (id !== 42) throw new Error(`recipe ${id} not found`);
      return {
        id,
        name: 'this again',
        steps: 'do whatever',
      };
    },
  },
  Recipe: {
    ingredients: async (obj) => {
      return obj.id != 42
        ? []
        : [
            { id: 1, name: 'uhh', quantity: 'ehh' },
            { id: 2, name: 'hmm', quantity: 'wow' },
          ];
    },
  },
};

server.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  }),
);

server.listen(PORT, HOST, () => {
  console.log(`producer running at http://${HOST}:${PORT}/graphql`);
});
