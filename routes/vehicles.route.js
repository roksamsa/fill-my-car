import express from 'express';

const vehicleSchema = require('../models/vehicle.model');
const router = express.Router();
const vehiclesURI = '/vehicles';

// Get vehicles list
router.get(vehiclesURI, function (req, res) {
  vehicleSchema.find((err, vehicles) => {
    if (err)
      console.log(err);
    else
      res.json(vehicles);
  });
});

// Get vehicles for specific user
router.get(vehiclesURI + '/user/:belongsToUser', function (req, res) {
  vehicleSchema.find({belongsToUser: req.params.belongsToUser}, (err, vehicles) => {
    if (err)
      console.log(err);
    else
      res.json(vehicles);
  });
});

// Get vehicle by specific id
router.get(vehiclesURI + '/:id', function (req, res) {
  vehicleSchema.findById(req.params.id, (err, vehicles) => {
    if (err)
      console.log(err);
    else
      res.json(vehicles);
  });
});

// Add vehicle
router.post(vehiclesURI + '/add', function (req, res) {
  var vehicle = new vehicleSchema(req.body);
  vehicle.save()
    .then(vehicle => {
      res.status(200).json({ 'Vehicle': vehicle + ' added successfully' });
    })
    .catch(err => {
      res.status(400).send('Failed to create new vehicle, with error: ' + err);
    });
});

// Update data for specific vehicle
router.route(vehiclesURI + '/update/:id').patch((req, res, next) => {
  var vehicleId = req.params.id;
  var vehicleUpdatedData = req.body;

  vehicleSchema.findOneAndUpdate(vehicleId, vehicleUpdatedData, function(error, vehicle) {
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

// Delete specific vehicle
router.route(vehiclesURI + '/delete/:id').delete((req, res) => {
  vehicleSchema.findByIdAndRemove({ _id: req.params.id }, (err, vehicles) => {
    if (err)
      res.json(err);
    else
      res.json('Vehicle removed successfully!');
  });
});

module.exports = router;
