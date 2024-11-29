const Car = require('./models/Car');

const resolvers = {
  Query: {
    getAllCars: async () => {
      return await Car.findAll();
    },

    getCars: async (_, { limit = 10, page = 1 }) => {
        const offset = (page - 1) * limit;  // Обчислюємо пропуск

        // Отримуємо записи машин з бази даних
        const cars = await Car.findAll({
          limit: limit,
          offset: offset,
        });

        // Отримуємо загальну кількість записів
        const totalCount = await Car.count();

        // Обчислюємо загальну кількість сторінок
        const totalPages = Math.ceil(totalCount / limit);

        // Повертаємо результат з пагінацією
        return {cars, totalPages,};
    },

    getCarByNumber: async (_, { car_number }) => {
      return await Car.findByPk(car_number);
    },
  },

  Mutation: {
    addCar: async (_, { car_number, brand, status, owner_surname }) => {
      return await Car.create({ car_number, brand, status, owner_surname });
    },

    updateCar: async (_, { car_number, brand, status, owner_surname }) => {
      const car = await Car.findByPk(car_number);
      if (car) {
        if (brand !== undefined) car.brand = brand;
        if (status !== undefined) car.status = status;
        if (owner_surname !== undefined) car.owner_surname = owner_surname;
        await car.save();
        return car;
      }
      throw new Error('Car not found');
    },

    deleteCar: async (_, { car_number }) => {
      const car = await Car.findByPk(car_number);
      if (car) {
        await car.destroy();
        return `Car with number ${car_number} deleted successfully.`;
      }
      throw new Error('Car not found');
    },
  },
};

module.exports = resolvers;
