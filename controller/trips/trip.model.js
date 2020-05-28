module.exports = (sequelize, Sequelize) => {
  const Trip = sequelize.define('Trip', {
    belongsToUser: {
      type: Sequelize.STRING
    },
    selectedVehicle: {
      type: Sequelize.STRING
    },
    tripStatus: {
      type: Sequelize.STRING
    },
    tripIdTag: {
      type: Sequelize.STRING
    },
    tripFromLocation: {
      type: Sequelize.STRING
    },
    tripToLocation: {
      type: Sequelize.STRING
    },
    tripCreationDate: {
      type: Sequelize.DATE
    },
    tripEditedDate: {
      type: Sequelize.DATE
    },
    tripDate: {
      type: Sequelize.DATE
    },
    tripTimeHour: {
      type: Sequelize.STRING
    },
    tripTimeMinutes: {
      type: Sequelize.STRING
    },
    tripDriverName: {
      type: Sequelize.STRING
    },
    tripDriverEmail: {
      type: Sequelize.STRING
    },
    tripAvailableSeats: {
      type: Sequelize.INTEGER
    },
    tripTakenSeats: {
      type: Sequelize.INTEGER
    },
    tripFreeSeats: {
      type: Sequelize.INTEGER
    },
    tripPrice: {
      type: Sequelize.INTEGER
    },
    tripLuggageSpace: {
      type: Sequelize.INTEGER
    },
    tripMessage: {
      type: Sequelize.TEXT,
      unique: false
    },
    tripNewPassengersAcceptance: {
      type: Sequelize.STRING
    },
    tripComfortable: {
      type: Sequelize.BOOLEAN
    },
    tripStopsOnTheWayToFinalDestination: {
      type: Sequelize.BOOLEAN
    },
    tripPassengersCanSmoke: {
      type: Sequelize.BOOLEAN
    },
    tripPetsAreAllowed: {
      type: Sequelize.BOOLEAN
    },
    tripQuiet: {
      type: Sequelize.BOOLEAN
    }/*,
    tripPageVisitsCounter: {
      type: Sequelize.INTEGER
    }*/
  });
  return Trip;
};
