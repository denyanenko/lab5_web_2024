const { gql } = require('apollo-server');

const typeDefs = gql`
  type Car {
    car_number: String!
    brand: String!
    status: String!
    owner_surname: String!
  }

  type PaginatedCars {
    cars: [Car!]!
    totalPages: Int!
  }


  type Query {
    getAllCars: [Car]
    getCars(limit: Int, page: Int): PaginatedCars!
    getCarByNumber(car_number: String!): Car
  }

  type Mutation {
    addCar(
      car_number: String!
      brand: String!
      status: String!
      owner_surname: String!
    ): Car

    updateCar(
      car_number: String!
      brand: String
      status: String
      owner_surname: String
    ): Car

    deleteCar(car_number: String!): String
  }
`;

module.exports = typeDefs;
