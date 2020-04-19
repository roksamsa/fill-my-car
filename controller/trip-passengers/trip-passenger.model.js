/* jshint node: true */
'use strict';

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
      type: Sequelize.INTEGER
    },
    tripPassengerEndLocation: {
      type: Sequelize.STRING
    },
    tripPassengerName: {
      type: Sequelize.INTEGER
    },
    tripPassengerEmail: {
      type: Sequelize.INTEGER
    },
    tripPassengerPhone: {
      type: Sequelize.BOOLEAN
    }
  });
  return TripPassenger;
};
