const express = require('express');
const database = require('../../database/database-setup');
const router = express.Router();
const Trip = database.trips;
const tripsURI = '/api/trips';
const tripURI = '/api/trip';

// Get all trips list
router.get(tripsURI, function (req, res) {
  Trip.findAll().then(trips => {
    // Send All Vehicles to Client
    res.json(trips);
  }).catch(error => {
    console.log(error);
    res.status(500).json({msg: "error", details: error});
  });
});

// Get a single Trip by Id
router.get(tripsURI + '/:id', function (req, res) {
  const id = req.params.id;
  Trip.findOne({where: {id: id}})
    .then(trip => {
      res.json(trip);
    })
    .catch(error => {
      res.status(500).json({msg: "error", details: error});
    });
});

// Get a single Trip by tripIdTag
router.get(tripURI + '/:tripIdTag', function (req, res) {
  const tripIdTag = req.params.tripIdTag;
  Trip.findOne({where: {tripIdTag: tripIdTag}})
    .then(trip => {
      res.json(trip);
    })
    .catch(error => {
      res.status(500).json({msg: "error", details: error});
    });
});

// Get all trips for specific user
router.get(tripsURI + '/user/:belongsToUser', function (req, res) {
  Trip.findAll({where: {belongsToUser: req.params.belongsToUser},
    order: [
      ['id', 'DESC']
    ]})
    .then(trips => {
      res.json(trips);
    }).catch(error => {
      console.log(error);
      res.status(500).json({msg: "Error!", details: error});
    });
});

// Create a new trip
router.post(tripsURI + '/add', function (req, res) {
  const trip = new Trip(req.body);
  trip.save()
    .then(trip => {
      res.status(200).json({'Trip': trip + ' added successfully'});
    })
    .catch(error => {
      res.status(400).send('Failed to create new trip, with error: ' + error);
    });
});

// Delete a specific trip with id
router.delete(tripsURI + '/delete/:id', function (req, res) {
  const id = req.params.id;
  Trip.destroy({where: {id: id}})
    .then(trip => {
      res.status(200).json({msg: 'Trip with id: ' + trip + ' deleted successfully.'});
    })
    .catch(error => {
      res.status(500).json({msg: "error", details: error});
    });
});

// Update data for specific trip
router.patch(tripsURI + '/update/:id', function (req, res) {
  const id = req.params.id;
  const tripUpdatedData = req.body;

  Trip.update(tripUpdatedData, {where: {id: id}})
    .then(trip => {
      if (!trip) {
        return res.status(404).json({
          message: 'Trip with id: ' + id + ' can not be found! Sorry :/'
        });
      } else {
        res.json(trip);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({msg: "error", details: error});
    });
});

module.exports = router;
