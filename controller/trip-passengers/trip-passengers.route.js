/* jshint node: true */
'use strict';

import express from 'express';
import database from '../../database/database-setup';

const router = express.Router();
const TripPassenger = database.TripPassenger;
const tripPassengersURI = '/api/trip-passengers';

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

// Get all trip passengers for specific user
router.get(tripPassengersURI + '/user/:belongsToUser', function (req, res) {
  TripPassenger.findAll({where: {belongsToUser: req.params.belongsToUser},
    order: [
      ['id', 'DESC']
    ]})
    .then(tripPassenger => {
      res.json(tripPassenger);
    }).catch(error => {
      console.log(error);
      res.status(500).json({msg: "Error!", details: error});
    });
});

// Create a new trip passenger
router.post(tripPassengersURI + '/add', function (req, res) {
  const tripPassengerValue = new TripPassenger(req.body);
  console.log(tripPassengerValue);
  tripPassengerValue.save()
    .then(tripPassengerValue => {
      res.status(200).json({'TripPassenger': tripPassengerValue + ' added successfully'});
    })
    .catch(error => {
      res.status(400).send('Failed to create new trip, with error: ' + error);
    });
});

// Delete a specific trip with id
router.delete(tripPassengersURI + '/delete/:id', function (req, res) {
  const id = req.params.id;
  TripPassenger.destroy({where: {id: id}})
    .then(tripPassenger => {
      res.status(200).json({msg: 'Trip with id: ' + tripPassenger + ' deleted successfully.'});
    })
    .catch(error => {
      res.status(500).json({msg: "error", details: error});
    });
});

// Delete all trip passengers
router.delete(tripPassengersURI + '/delete/:id', function (req, res) {
  const id = req.params.id;
  TripPassenger.destroy({where: {}, truncate: true})
    .then(tripPassenger => {
      res.status(200).json({msg: 'Trip with id: ' + tripPassenger + ' deleted successfully.'});
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
          message: 'Trip with id: ' + id + ' can not be found! Sorry :/'
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
