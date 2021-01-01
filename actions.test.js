const { create_room, enter_room, leave_room, enter_game, leave_lobby } = require("./actions");
console.log("Start testing");

let rooms = [];
let p1 = "a";

let cl = console.log;

cl(create_room(rooms, p1));
cl(rooms);

let r1 = rooms[0].room_id;
cl(leave_room(rooms, p1, r1));
cl(rooms);

create_room(rooms, p1);
cl(rooms);
let p2 = "b";
let r2 = rooms[0].room_id;
cl(enter_room(rooms, p2, r2));
cl(rooms);

cl(enter_room(rooms, p2, r2));
cl(rooms);

cl(enter_game(rooms, p1, r2));
let p3 = "c";
cl(enter_room(rooms, p3, r2));
cl(leave_room(rooms, p2, r2));

cl(enter_game(rooms, p2, r2));
cl(rooms);

cl(create_room(rooms, "abc"));
cl(rooms);

cl(create_room(rooms, "bbb"));
cl(rooms);

cl(enter_room(rooms, "ccc", rooms[1].room_id));
cl(rooms);

cl(leave_lobby(rooms, "bbb"));
cl(rooms);

cl(leave_lobby(rooms, "abc"));
cl(rooms);