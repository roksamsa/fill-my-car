import express from 'express';
import path from 'path';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {morgan, logger} from 'morgan';
import favicon from 'serve-favicon';
import Vehicle from './models/Vehicle';
import config from './config/database';

const api = require('./routes/api');
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, {promiseLibrary: require('bluebird'), useNewUrlParser: true})
  .then(() =>  console.log('Mongo database running! :)'))
  .catch((err) => console.error(err));

app.use(passport.initialize());

router.route('/').get((req, res) => {
  Vehicle.find((err, vehicles) => {
    if (err)
      console.log(err);
    else
      res.json(vehicles);
  });
});

router.route('/vehicles').get((req, res) => {
  Vehicle.find((err, vehicles) => {
    if (err)
      console.log(err);
    else
      res.json(vehicles);
  });
});

router.route('/vehicles/:id').get((req, res) => {
  Vehicle.findById(req.params.id, (err, vehicle) => {
    if (err)
      console.log(err);
    else
      res.json(vehicle);
  });
});

router.route('/vehicles/add').post((req, res) => {
  let vehicle = new Vehicle(req.body);
  vehicle.save()
    .then(vehicle => {
      res.status(200).json({ 'vehicle': 'Added successfully' })
    })
    .catch(err => {
      res.status(400).send('Failed to create new vehicle');
    });
});

router.route('/vehicles/update/:id').patch((req, res) => {
  Vehicle.findById(req.params.id, (err, vehicle) => {
    if (!vehicle)
      return next(new Error('Error! Could not load document'));
    else {
      vehicle.vehicleType = req.body.vehicleType;
      vehicle.vehicleBrand = req.body.vehicleBrand;
      vehicle.vehicleName = req.body.vehicleName;
      vehicle.vehicleModelYear = req.body.vehicleModelYear;
      vehicle.vehicleColor = req.body.vehicleColor;
      vehicle.vehicleSeats = req.body.vehicleSeats;
      vehicle.vehicleMaxLuggage = req.body.vehicleMaxLuggage;

      vehicle.save().then(vehicle => {
        res.json('Update done!');
      }).catch(err => {
        res.status(400).send('Update failed!');
      });
    }
  });
});

router.route('/vehicles/delete/:id').delete((req, res) => {
  Vehicle.findByIdAndRemove({ _id: req.params.id }, (err, vehicle) => {
    if (err)
      res.json(err);
    else
      res.json('Removed successfully!');
  });
});

app.use('/', router);

app.listen(4000, () => console.log('Server on port 4000!'));