import express from 'express';
const router = express.Router();
const vehicleSchema = require('../models/vehicle.model');

// Get vehicles list
router.get('/vehicles', function (req, res) {
  vehicleSchema.find((err, vehicles) => {
    if (err)
      console.log(err);
    else
      res.json(vehicles);
  });
});

// Get vehicles for specific user
router.get('/vehicles/user/:belongsToUser', function (req, res) {
  vehicleSchema.find({belongsToUser: req.params.belongsToUser}, (err, vehicles) => {
    if (err)
      console.log(err);
    else
      res.json(vehicles);
  });
});

// Get vehicle by specific id
router.get('/vehicles/:id', function (req, res) {
  vehicleSchema.findById(req.params.id, (err, vehicles) => {
    if (err)
      console.log(err);
    else
      res.json(vehicles);
  });
});

// Add vehicle
router.post('/vehicles/add', function (req, res) {
  var vehicle = new vehicleSchema(req.body);
  vehicle.save()
    .then(vehicle => {
      res.status(200).json({ 'Vehicle': 'Added successfully' });
    })
    .catch(err => {
      res.status(400).send('Failed to create new vehicle');
    });
});

router.route('/vehicles/edit/:id').patch((req, res) => {
  vehicleSchema.findById(req.params.id, (err, vehicles) => {
    if (!vehicles)
      return next(new Error('Error! Could not load document'));
    else {
      vehicleSchema.vehicleType = req.body.vehicleType;
      vehicleSchema.vehicleBrand = req.body.vehicleBrand;
      vehicleSchema.vehicleName = req.body.vehicleName;
      vehicleSchema.vehicleModelYear = req.body.vehicleModelYear;
      vehicleSchema.vehicleColor = req.body.vehicleColor;
      vehicleSchema.vehicleSeats = req.body.vehicleSeats;
      vehicleSchema.vehicleMaxLuggage = req.body.vehicleMaxLuggage;

      vehicleSchema.save().then(vehicles => {
        res.json('Vehicle edit done!');
      }).catch(err => {
        res.status(400).send('Vehicle edit failed!');
      });
    }
  });
});

router.route('/vehicles/delete/:id').delete((req, res) => {
  vehicleSchema.findByIdAndRemove({ _id: req.params.id }, (err, vehicles) => {
    if (err)
      res.json(err);
    else
      res.json('Vehicle removed successfully!');
  });
});

module.exports = router;
