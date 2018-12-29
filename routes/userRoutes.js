const mongoose = require('mongoose');
const omit = require('object.omit');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/profile', requireLogin, (req, res) => {
    res.send(omit(req.user.toJSON(), ['password', '__v']));
  });

  app.get('/api/profile/:id', async (req, res) => {
    const { id } = req.params;
    User.findById(id, 'avatar firstName', (err, user) => {
      if (err) {
        return res.status(400).send('User does not exist.');
      }
      res.send(user);
    });
  });

  app.post('/api/profile/edit', requireLogin, async (req, res) => {
    const { _id } = req.user;
    const notAllowed = [
      'password',
      'reviews',
      'createdAt',
      'bookings',
      'email'
    ];
    //exclude unsafe fields
    const toChange = omit(req.body, notAllowed);
    await User.findByIdAndUpdate(
      _id,
      toChange,
      { new: true, select: '-password -__v' },
      (err, user) => {
        if (err) {
          return res.status(400).send('Cannot update. Try again.');
        }
        res.send(user);
      }
    );
  });

  app.post('/api/profile/changePassword', requireLogin, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user;
    let user = new User();
    let newHash = user.generateHash(newPassword);
    await User.findByIdAndUpdate(
      _id,
      { password: newHash },
      { new: true, select: '-password -__v' },
      (err, user) => {
        if (err) {
          return res.status(400).send('Cannot update. Try again.');
        }
        res.send(user);
      }
    );
  });
};