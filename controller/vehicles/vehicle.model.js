module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define('Vehicle', {
    belongsToUser: {
      type: Sequelize.STRING
    },
    vehicleType: {
      type: Sequelize.STRING
    },
    vehicleBrand: {
      type: Sequelize.STRING
    },
    vehicleName: {
      type: Sequelize.STRING
    },
    vehicleModelYear: {
      type: Sequelize.INTEGER
    },
    vehicleColor: {
      type: Sequelize.STRING
    },
    vehicleSeats: {
      type: Sequelize.INTEGER
    },
    vehicleMaxLuggage: {
      type: Sequelize.INTEGER
    },
    vehicleInsurance: {
      type: Sequelize.BOOLEAN
    }
  });
  return Vehicle;
};
