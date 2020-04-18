/* jshint node: true */
'use strict';

import express from 'express';
import database from '../../database/database-setup';

const router = express.Router();
const Vehicle = database.vehicles;
const vehiclesURI = '/api/vehicles';

// Get all Vehicles
router.get(vehiclesURI, function (req, res) {
  Vehicle.findAll().then(vehicles => {
    // Send All Vehicles to Client
    res.json(vehicles.sort(function(v1, v2) {
      return v1.id - v2.id;
    }));
  }).catch(error => {
    console.log(error);
    res.status(500).json({msg: "error", details: error});
  });
});

// Get all Vehicles for Specific User
router.get(vehiclesURI + '/user/:belongsToUser', function (req, res) {
  Vehicle.findAll({ where: { belongsToUser: req.params.belongsToUser }}).then(vehicles => {
      res.json(vehicles);
    }).catch(error => {
      console.log(error);
      res.status(500).json({msg: "Error!", details: error});
    });
});

// Create a new Vehicle
router.post(vehiclesURI + '/add', function (req, res) {
  var vehicle = new Vehicle(req.body);
  vehicle.save()
    .then(vehicle => {
      res.status(200).json({ 'Vehicle': vehicle + ' added successfully' });
    })
    .catch(err => {
      res.status(400).send('Failed to create new vehicle, with error: ' + err);
    });
});

// Retrieve a single Vehicle by Id
//router.get('/api/vehicles/:id', vehicles.findById);

// Update a Vehicle with Id
//router.update('/api/vehicles', vehicles.update);

// Delete a Vehicle with Id
//router.delete('/api/vehicles/:id', vehicles.delete);

module.exports = router;
