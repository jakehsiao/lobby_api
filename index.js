const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3050;
// PORT=1234 node app.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Even I don't know what this line is for, two tutorials use that so I add it
app.use(cors());

let str = "Hello Express";

let rooms = [];

const { create_room, enter_room, leave_room, enter_game, leave_lobby } = require("./actions");

app.get('/rooms', (req, res) => {
  return res.json({rooms});
});

// app.get('/updated', (req, res) => res.send("Welcome to updated"));

// app.post('/', (req, res) => {
//   return res.send(`This is posting ${req.body.text}`);
// });

app.post('/create', (req, res) => {
  let created = create_room(rooms, req.body.player_id);
  return res.send(created);
});

app.post('/enter', (req, res) => {
  let msg = enter_room(rooms, req.body.player_id, req.body.room_id, req.body.max_players);
  return res.send(msg);
});
app.post('/leave', (req, res) => {
  let msg = leave_room(rooms, req.body.player_id, req.body.room_id);
  return res.send(msg);
});
app.post('/entergame', (req, res) => {
  let msg = enter_game(rooms, req.body.player_id, req.body.room_id);
  return res.send(msg);
});
app.post('/leavelobby', (req, res) => {
  console.log(`Receive leave lobby with ${req.body}`);
  let msg = leave_lobby(rooms, req.body.player_id);
  return res.send(msg);
});

app.listen(port, () => console.log(`App is on port ${port}`));