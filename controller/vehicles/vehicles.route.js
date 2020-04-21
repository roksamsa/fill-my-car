import express from 'express';
import database from '../../database/database-setup';

const router = express.Router();
const Vehicle = database.vehicles;
const vehiclesURI = '/api/vehicles';

// Get all vehicles
router.get(vehiclesURI, function (req, res) {
  Vehicle.findAll().then(vehicles => {
    // Send All Vehicles to Client
    res.json(vehicles);
  }).catch(error => {
    console.log(error);
    res.status(500).json({msg: "error", details: error});
  });
});

// Get a single Vehicle by Id
router.get(vehiclesURI + '/:id', function (req, res) {
  const id = req.params.id;
  Vehicle.findOne({where: {id: id}})
    .then(vehicle => {
      res.json(vehicle);
    })
    .catch(error => {
      res.status(500).json({msg: "error", details: error});
    });
});

// Get all vehicles for specific user
router.get(vehiclesURI + '/user/:belongsToUser', function (req, res) {
  Vehicle.findAll({where: {belongsToUser: req.params.belongsToUser},
    order: [
      ['id', 'DESC']
    ]})
    .then(vehicles => {
      res.json(vehicles);
    }).catch(error => {
      console.log(error);
      res.status(500).json({msg: "Error!", details: error});
    });
});

// Create a new vehicle
router.post(vehiclesURI + '/add', function (req, res) {
  const vehicle = new Vehicle(req.body);
  vehicle.save()
    .then(vehicle => {
      res.status(200).json({'Vehicle': vehicle + ' added successfully'});
    })
    .catch(error => {
      res.status(400).send('Failed to create new vehicle, with error: ' + error);
    });
});

// Delete a specific vehicle with id
router.delete(vehiclesURI + '/delete/:id', function (req, res) {
  const id = req.params.id;
  Vehicle.destroy({where: {id: id}})
    .then(vehicle => {
      res.status(200).json({msg: 'Vehicle with id: ' + vehicle + ' deleted successfully.'});
    })
    .catch(error => {
      res.status(500).json({msg: "error", details: error});
    });
});

// Update a Vehicle with Id
router.patch(vehiclesURI + '/update/:id', function (req, res) {
  const id = req.params.id;
  const vehicleUpdatedData = req.body;

  Vehicle.update(vehicleUpdatedData, {where: {id: id}})
    .then(vehicle => {
      if (!vehicle) {
        return res.status(404).json({
          message: 'Vehicle with id: ' + id + ' can not be found! Sorry :/'
        });
      } else {
        res.json(vehicle);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({msg: "error", details: error});
    });
});

module.exports = router;
