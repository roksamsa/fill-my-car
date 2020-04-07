import express from 'express';

const tripPassengerSchema = require('../models/trip-passenger.model');
const tripsURI = '/trip-passengers';
const router = express.Router();

// Get trip passengers list
router.get(tripsURI, function (req, res) {
  tripPassengerSchema.find((err, passengers) => {
    if (err)
      console.log(err);
    else
      res.json(passengers);
  });
});

// Get trips for specific user
router.get(tripsURI + '/user/:belongsToUser', function (req, res) {
  tripPassengerSchema.find({belongsToUser: req.params.belongsToUser}, (err, passengers) => {
    if (err)
      console.log(err);
    else
      res.json(passengers);
  });
});

// Get trip passenger by specific id
router.get(tripsURI + '/:id', function (req, res) {
  tripPassengerSchema.findById(req.params.id, (err, passengers) => {
    if (err)
      console.log(err);
    else
      res.json(passengers);
  });
});

// Add trip passenger
router.post(tripsURI + '/add', function (req, res) {
  var tripPassenger = new tripPassengerSchema(req.body);
  console.log('tripPassenger');
  console.log(tripPassenger);
  tripPassenger.save()
    .then(tripPassenger => {
      res.status(200).json({'Trip passenger': tripPassenger + ' Added successfully'});
    })
    .catch(err => {
      res.status(400).send(err + 'Failed to add passenger to this trip');
    });
});

// Update data for specific trip passenger
router.route(tripsURI + '/update/:id').patch((req, res, next) => {
  var vehicleId = req.params.id;
  var vehicleUpdatedData = req.body;

  tripPassengerSchema.findOneAndUpdate(vehicleId, vehicleUpdatedData, function(error, vehicle) {
    // Handle the error using the Express error middleware
    if (error) {
      return next('Error: ' + error);
    }
    // Render not found error
    else if (!vehicle) {
      return res.status(404).json({
        message: 'Vehicle with id: ' + vehicleId + ' can not be found! Sorry :/'
      });
    } else {
      res.json(vehicle);
    }
  });
});

// Delete specific trip passenger
router.route(tripsURI + '/delete/:id').delete((req, res) => {
  tripPassengerSchema.findByIdAndRemove({ _id: req.params.id }, (err, tripPassengers) => {
    if (err)
      res.json(err);
    else
      res.json('Trip passenger removed successfully!');
  });
});

// Delete all trip passengers
router.route(tripsURI + '/delete-all/').delete((req, res) => {
  tripPassengerSchema.deleteMany((err, tripPassengers) => {
    if (err)
      res.json(err);
    else
      res.json('All trip passengers removed successfully!');
  });
});

module.exports = router;
