// backend/routes/roomRoutes.js
const express = require('express');
const router = express.Router();

let rooms = [
  { id: 1, number: '101', type: 'Single', occupied: false },
  { id: 2, number: '102', type: 'Double', occupied: true }
];

router.get('/', (req, res) => {
  res.json(rooms);
});

router.post('/', (req, res) => {
  const newRoom = { id: Date.now(), ...req.body };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

router.put('/:id', (req, res) => {
  const roomId = parseInt(req.params.id);
  const index = rooms.findIndex(r => r.id === roomId);
  if (index !== -1) {
    rooms[index] = { ...rooms[index], ...req.body };
    res.json(rooms[index]);
  } else {
    res.status(404).json({ message: 'Room not found' });
  }
});

router.delete('/:id', (req, res) => {
  const roomId = parseInt(req.params.id);
  rooms = rooms.filter(r => r.id !== roomId);
  res.status(204).end();
});

module.exports = router;
