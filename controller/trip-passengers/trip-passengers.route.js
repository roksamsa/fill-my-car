const express = require('express');
const database = require('../../database/database-setup');
const router = express.Router();
const TripPassenger = database.tripPassengers;
const tripPassengersURI = '/trip-passengers';

// Get all trip passengers list
router.get(tripPassengersURI, function (req, res) {
  TripPassenger.findAll().then(tripPassengers => {
    // Send All tripPassengers to Client
    res.json(tripPassengers);
  }).catch(error => {
    console.log(error);
    res.status(500).json({msg: "error", details: error});
  });
});

// Get a single trip passenger by Id
router.get(tripPassengersURI + '/:id', function (req, res) {
  const id = req.params.id;
  TripPassenger.findOne({where: {id: id}})
    .then(tripPassenger => {
      res.json(tripPassenger);
    })
    .catch(error => {
      res.status(500).json({msg: "error", details: error});
    });
});

// Get a single trip passenger by Hash
router.get(tripPassengersURI + '/passenger/:tripPassengerCancelTripHash', function (req, res) {
  const tripPassengerCancelTripHash = req.params.tripPassengerCancelTripHash;
  TripPassenger.findOne({where: {tripPassengerCancelTripHash: tripPassengerCancelTripHash}})
    .then(TripPassenger => {
      res.json(TripPassenger);
    })
    .catch(error => {
      res.status(500).json({msg: "error", details: error});
    });
});

// Create a new trip passenger
router.post(tripPassengersURI + '/add', function (req, res) {
  const tripPassengerValue = new TripPassenger(req.body);
  tripPassengerValue.save()
    .then(tripPassengerValue => {
      res.status(200).json({'TripPassenger': tripPassengerValue + ' added successfully'});
    })
    .catch(error => {
      res.status(400).send('Failed to create new trip passenger, with error: ' + error);
    });
});

// Delete a specific trip with id
router.delete(tripPassengersURI + '/delete/:tripPassengerCancelTripHash', function (req, res) {
  const tripPassengerCancelTripHash = req.params.tripPassengerCancelTripHash;
  TripPassenger.destroy({where: {tripPassengerCancelTripHash: tripPassengerCancelTripHash}})
    .then(tripPassengerCancelTripHash => {
      res.status(200).json({msg: 'Trip passenger with tripPassengerCancelTripHash: ' + tripPassengerCancelTripHash + ' deleted successfully.'});
    })
    .catch(error => {
      res.status(500).json({msg: "error", details: error});
    });
});

// Delete all trip passengers
router.delete(tripPassengersURI + '/delete-all', function (req, res) {
  TripPassenger.destroy({where: {}, truncate: true})
    .then(tripPassenger => {
      res.status(200).json({msg: 'All trip passengers deleted successfully.'});
    })
    .catch(error => {
      res.status(500).json({msg: "error", details: error});
    });
});

// Update data for specific trip
router.patch(tripPassengersURI + '/update/:id', function (req, res) {
  const id = req.params.id;
  const tripUpdatedData = req.body;

  TripPassenger.update(tripUpdatedData, {where: {id: id}})
    .then(tripPassenger => {
      if (!tripPassenger) {
        return res.status(404).json({
          message: 'Trip passenger with id: ' + id + ' can not be found! Sorry :/'
        });
      } else {
        res.json(tripPassenger);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({msg: "error", details: error});
    });
});

module.exports = router;
