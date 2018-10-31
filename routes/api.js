import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const config = require('../config/database');
require('../config/passport')(passport);

const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");
const Vehicle = require("../models/vehicle");

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.post('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
  const token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    const newBook = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher
    });

    newBook.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save book failed.'});
      }
      res.json({success: true, msg: 'Successful created new book.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
  const token = getToken(req.headers);
  if (token) {
    Book.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

const getToken = function (headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

router.get('/vehicles', (req, res) => {
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

module.exports = router;
