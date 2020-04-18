import express from 'express';

const tripSchema = require('../database/models/trip.model');
const router = express.Router();
const tripsURI = '/trips';
const tripOptions = {upsert: true, returnOriginal: false};

// Get trips list
router.get(tripsURI, function (req, res) {
  tripSchema.find((err, trips) => {
    if (err)
      console.log(err);
    else
      res.json(trips);
  });
});

// Get trips for specific user
router.get(tripsURI + '/user/:belongsToUser', function (req, res) {
  tripSchema.find({belongsToUser: req.params.belongsToUser}, (err, trips) => {
    if (err)
      console.log(err);
    else
      res.json(trips);
  });
});

// Get trip by specific id
router.get(tripsURI + '/:id', function (req, res) {
  tripSchema.findById(req.params.id, (err, trips) => {
    if (err)
      console.log(err);
    else
      res.json(trips);
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
  var tripId = {_id: req.params.id};
  var tripUpdatedData = {$set: req.body};

  tripSchema.findOneAndUpdate(tripId, tripUpdatedData, tripOptions, function(error, trip) {
    // Handle the error using the Express error middleware
    if (error) {
      return next('Error: ' + error);
    }
    // Render not found error
    else if (!trip) {
      return res.status(404).json({
        message: 'Trip with id: ' + tripId + ' can not be found! Sorry :/'
      });
    } else {
      res.json(trip);
    }
  });
});

// Update only specific field for specific trip
router.route(tripsURI + '/update-specific-field/:id').patch((req, res, next) => {
  var tripId = {_id: req.params.id};
  var tripUpdatedData = {$set: req.body};

  tripSchema.findOneAndUpdate(tripId, tripUpdatedData, tripOptions, function(error, trip) {
    // Handle the error using the Express error middleware
    if (error) {
      return next('Error: ' + error);
    }
    // Render not found error
    else if (!trip) {
      return res.status(404).json({
        message: 'Trip with id: ' + tripId + ' can not be found! Sorry :/'
      });
    } else {
      res.json(trip);
    }
  });
});

// Delete specific trip
router.route(tripsURI + '/delete/:id').delete((req, res) => {
  tripSchema.findByIdAndRemove({ _id: req.params.id }, (err, trips) => {
    if (err)
      res.json(err);
    else
      res.json('Trip removed successfully!');
  });
});

module.exports = router;
