const mongoose = require('mongoose');
const checkAvailability = require('../utils/checkAvailability');
const Booking = mongoose.model('bookings');
const Hotel = mongoose.model('hotels');
const Room = mongoose.model('rooms');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/booking/start', requireLogin, async (req, res) => {
    const { hotel: hotelID, from, to, roomType } = req.body;
    const user = req.user;
    if (!hotel || !from || !to || !roomType) {
      return res.status(401).send('Missing parameters.');
    }

    const base64 = Buffer.from(
      JSON.stringify({ hotelID, from, to, roomType, user: user._id })
    ).toString('base64');

    res.send(base64);
    // const decrypted = Buffer.from(base64, 'base64').toString('ascii');
  });

  app.post('/api/booking/', requireLogin, async (req, res) => {
    const { hotel: hotelID, from, to, roomType } = req.body;
    const user = req.user;
    const hotel = await Hotel.findById(hotelID).lean();

    if (!hotel) {
      return res.status(400).send('Hotel does not exist');
    }

    const availableRoom = await checkAvailability(hotel, from, to, roomType);
    if (!availableRoom) {
      return res.status(400).send('Room not available');
    }

    const booking = new Booking();
    booking.room = availableRoom._id;
    booking.user = user._id;
    booking.from = new Date(from);
    booking.to = new Date(to);

    try {
      await booking.save();
      await Room.findByIdAndUpdate(availableRoom._id, {
        $addToSet: { bookings: booking._id }
      });
      res.send('Room successfully booked.');
    } catch (err) {
      res.status(400).send('There was an error. Cannot book your room.');
    }
  });
};
