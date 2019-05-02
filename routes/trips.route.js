import express from 'express';

const tripSchema = require('../models/trip.model');
const router = express.Router();
const tripsURI = '/trips';

// Get vehicles list
router.get(tripsURI, function (req, res) {
  tripSchema.find((err, vehicles) => {
    if (err)
      console.log(err);
    else
      res.json(vehicles);
  });
});

// Get trips for specific user
router.get(tripsURI + '/user/:belongsToUser', function (req, res) {
  tripSchema.find({belongsToUser: req.params.belongsToUser}, (err, vehicles) => {
    if (err)
      console.log(err);
    else
      res.json(vehicles);
  });
});

// Get trip by specific id
router.get(tripsURI + '/:id', function (req, res) {
  tripSchema.findById(req.params.id, (err, vehicles) => {
    if (err)
      console.log(err);
    else
      res.json(vehicles);
  });
});

// Add trip
router.post(tripsURI + '/add', function (req, res) {
  var trip = new tripSchema(req.body);
  trip.save()
    .then(trip => {
      res.status(200).json({'Trip': trip + ' Added successfully'});
    })
    .catch(err => {
      res.status(400).send(err + 'Failed to create new trip');
    });
});

// Update data for specific trip
router.route(tripsURI + '/update/:id').patch((req, res, next) => {
  var vehicleId = req.params.id;
  var vehicleUpdatedData = req.body;

  tripSchema.findByIdAndUpdate(vehicleId, vehicleUpdatedData, function(error, vehicle) {
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

// Delete specific trip
router.route(tripsURI + '/delete/:id').delete((req, res) => {
  tripSchema.findByIdAndRemove({ _id: req.params.id }, (err, vehicles) => {
    if (err)
      res.json(err);
    else
      res.json('Vehicle removed successfully!');
  });
});

module.exports = router;
