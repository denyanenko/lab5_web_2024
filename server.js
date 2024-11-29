const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const sequelize = require('./config/database');

// Підключення до бази даних
sequelize.sync().then(() => {
  console.log('Database connected!');
  
  // Ініціалізація та запуск Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
