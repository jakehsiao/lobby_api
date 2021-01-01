const { v4 } = require('uuid');  // Cannot "v4 as uuidv4"?

const room_template = {
  players: [],
  room_id: 0,
};

const player_template = {
  entered: false,
};

const MAX_ROOM_NUM = 100;

function create_room(rooms, player_id, max_players) {
  if (rooms.length < MAX_ROOM_NUM) {
    let room_id = v4().slice(0,4);
    let new_room = {...room_template, players: [{...player_template, player_id}], room_id, max_players: max_players || 4};
    rooms.push(new_room);
    return `创建成功 ${room_id}`;
  }
  else {
    return "没有空房间了";
  }
}

function enter_room(rooms, player_id, room_id) {
  // MAX_PLAYERS is something on frontend, not on here, yes make API as simple as possible, and let one thing being determined in only one place
  // Also, change "entered" is also on frontend
  // Emmm...I feel this way is not that cool, this should be more state specific, and every move check the state

  // I just don't want this lobby to specify all num_players
  let room = rooms.find(r => r.room_id == room_id);
  if (room != undefined) {
    if (!room.players.map(p => p.player_id).includes(player_id)) {
      if (room.players.find(p => p.entered) != undefined) {
        return "已经开始了哦";
      }
      else if (room.players.length >= (room.max_players || 4)) {
        return "人满了哦";
      }
      else {
        room.players.push({...player_template, player_id});

        if (room.players.length >= room.max_players) {
          for (let p of room.players) {
            p.entered = true;
          }
        }
        return `加入成功`;
      }
    }
    else {
      return "已经加入了哦";
    }
  }
  else {
    return "没有这间房哦";
  }
}

function leave_room(rooms, player_id, room_id) {
  let room = rooms.find(r => r.room_id == room_id);
  if (room != undefined) {
    if (!room.players.map(p => p.player_id).includes(player_id)) {
      return `不在这间房哦`;
    }
    else if (room.players.find(p => p.entered) != undefined) {
      return "已经开始了哦";
    }
    else {
      room.players = room.players.filter(p => p.player_id != player_id);

      if (room.players.length == 0) {
        // console.log("没有玩家了哦");
        rooms.splice(rooms.indexOf(room), 1);
        // rooms = [3];
      }

      return "已经退出了哦";
    }
  }
  else {
    return "没有这间房哦";
  }
}

function enter_game(rooms, player_id, room_id) {
  let room = rooms.find(r => r.room_id == room_id);
  if (room != undefined) {
    let player = room.players.find(x => x.player_id == player_id);
    if (player != undefined) {
      player.entered = true;

      // Check all entered
      if (room.players.find(x => !x.entered) == undefined) {
        rooms.splice(rooms.indexOf(room), 1);
      }

      return `进入游戏了哦`;
    }
    else {
      return "不在这间房哦";
    }
  }
  else {
    return "没有这间房哦";
  }
}

function clean_empty_rooms(rooms) {
  let len = rooms.length;
  for (let i=len-1; i>=0; i--) {
    if (rooms[i].players.length == 0) {
      rooms.splice(i, 1);
    }
  }
}

function leave_lobby(rooms, player_id) {
  for (let room of rooms) {
    room.players = room.players.filter(p => (p.player_id != player_id) || (p.entered));
    // room.players = room.players.filter(p => (p.player_id != player_id));
  }
  clean_empty_rooms(rooms);
  return `退出了哦 ${player_id}`;
}

module.exports = { create_room, enter_room, leave_room, enter_game, leave_lobby }