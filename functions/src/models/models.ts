interface IRequestCreateUserReq {
  uid: string;
}

interface IRequestCreateUserRes {
  success: boolean;
  msg: string;
}

interface IRequestCreateRoomReq {
  uid: string;
}

interface IRequestCreateRoomRes {
  success: boolean;
  roomId: string;
}

interface IRequestSearchRoomReq {
  roomId: string
}

interface IRequestSearchRoomRes {
  success: boolean
  msg: string,
  room: Room | null,
}

interface IRequestJoinRoomReq {
  roomId: string
}

interface IRequestJoinRoomRes {
  success: boolean,
  roomId: string,
  msg: string,
}

interface IRequestJoinedRoomsReq {
  uid: string
}

interface IRequestJoinedRoomsRes {
  rooms: Room[],
  success: boolean,
  msg: string
}

interface IRequestRoomDataReq {
  uid: string,
  roomId: string
}

interface IRequestRoomDataRes {
  success: boolean,
  roomData: RoomWithOpponent | null,
  msg:string
}

interface Room {
  id: string;
  player1: string;
  player2: string;
  players: [string, string];
}

interface RoomWithOpponent extends Room {
  opponent: {
    displayName: string,
    profilePic: string,
  } | null
}

interface User {
  uid: string;
  displayName: string;
  email: string;
  profilePic: string;
}
