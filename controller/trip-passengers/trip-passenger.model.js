module.exports = (sequelize, Sequelize) => {
  const TripPassenger = sequelize.define('TripPassenger', {
    belongsToUser: {
      type: Sequelize.STRING
    },
    belongsToVehicle: {
      type: Sequelize.STRING
    },
    belongsToTrip: {
      type: Sequelize.STRING
    },
    tripPassengerSeatsReservation: {
      type: Sequelize.INTEGER
    },
    tripPassengerStartLocation: {
      type: Sequelize.STRING
    },
    tripPassengerEndLocation: {
      type: Sequelize.STRING
    },
    tripPassengerName: {
      type: Sequelize.STRING
    },
    tripPassengerEmail: {
      type: Sequelize.STRING
    },
    tripPassengerPhone: {
      type: Sequelize.STRING
    }
  });
  return TripPassenger;
};
