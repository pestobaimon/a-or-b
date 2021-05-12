/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import getRanHex from "./hexDigits";

admin.initializeApp();
const db = admin.firestore();

const createUserRecord = async (user: admin.auth.UserRecord) => {
  const newUser: User = {
    uid: user.uid,
    displayName: user.displayName ? user.displayName : "undefined",
    email: user.email ? user.email : "undefined",
    profilePic:
      "https://firebasestorage.googleapis.com/v0/b/a-or-b-8c21c.appspot.com/o/default_profile_pic.png?alt=media&token=77062b42-d95d-404e-bb82-e7939dbad88d",
  };

  const userCollection = db.collection("users");
  await userCollection.doc(user.uid).create(newUser);
};

const getUser = async (uid:string) => {
  if (uid === "") return null;
  const res = await db.doc(`users/${uid}`).get().then((res) => res).catch((e) => {
    console.log(e);
    return null;
  });
  if (res?.exists) return res.data() as User;
  else return null;
};

exports.onSignUp = functions.auth.user().onCreate(createUserRecord);

exports.requestCreateUser = functions.https.onCall(
  async (
    data: IRequestCreateUserReq,
    context: functions.https.CallableContext
  ) => {
    const {uid} = data;
    const userDocRef = db.doc(`users/${uid}`);
    const userDoc = await userDocRef.get();

    const response: IRequestCreateUserRes = {
      success: false,
      msg: "",
    };

    if (userDoc.exists) {
      response.msg = "creation failed: user already exists in database";
      return response;
    } else {
      response.success = true;
      response.msg = `creation successful: added user ${uid} to database`;
      return response;
    }
  }
);

exports.requestCreateRoom = functions.https.onCall(
  async (
    data: IRequestCreateRoomReq,
    context: functions.https.CallableContext
  ) => {
    if (!context.auth) {
      const msg = {msg: "not authorized"};
      return msg;
    }

    let exists = true;
    let roomId = "";
    while (exists) {
      roomId = getRanHex(6);
      const room = await db.doc(`rooms/${roomId}`).get();
      exists = room.exists;
    }

    const newRoom: Room = {
      id: roomId,
      player1: context.auth.uid,
      player2: "",
      players: [context.auth.uid, ""],
    };

    const result = await db
      .doc(`rooms/${roomId}`)
      .create(newRoom)
      .then(
        (res) => {
          return res;
        },
        (error) => {
          console.log(`create room error: ${error}`);
          return error;
        }
      );

    const msg: IRequestCreateRoomRes = result ?
      {
        success: true,
        roomId: roomId,
      } :
      {
        success: false,
        roomId: "",
      };

    return msg;
  }
);

exports.requestSearchRoom = functions.https.onCall(
  async (data: IRequestSearchRoomReq, context: functions.https.CallableContext) => {
    const msg: IRequestSearchRoomRes = {
      success: false,
      msg: "",
      room: null,
    };
    if (context.auth) {
      const roomDoc = await db.doc(`rooms/${data.roomId}`).get();

      if (!roomDoc.exists) {
        msg.msg = "room not found";
        msg.success = true;
        return msg;
      }
      const roomData = roomDoc.data() as Room;
      if (roomData.players.includes(context.auth.uid)) {
        console.log(`user: ${context.auth.uid} already in room`);
        msg.msg = "error: already in room";
        msg.success = true;
        return msg;
      } else if (roomData.player2.length > 0) {
        msg.msg = "error: room full";
        msg.success = true;
        return msg;
      } else {
        msg.success = true;
        msg.msg = `room ${roomData.id} found`;
        msg.room = roomData;
        return msg;
      }
    } else {
      msg.msg = "error: not authorized";
      return msg;
    }
  }
);

exports.requestJoinRoom = functions.https.onCall(
  async (data: IRequestJoinRoomReq, context: functions.https.CallableContext) => {
    const msg: IRequestJoinRoomRes = {
      success: false,
      msg: "",
      roomId: "",
    };

    if (context.auth) {
      const roomRef = db.doc(`rooms/${data.roomId}`);
      const roomDoc = await roomRef.get();
      if (!roomDoc.exists) {
        msg.msg = "room not found";
        return msg;
      }

      const roomData = roomDoc.data() as Room;

      if (roomData.players.includes(context.auth.uid)) {
        console.log(`user: ${context.auth.uid} already in room`);
        msg.msg = `user: ${context.auth.uid} already in room`;
        return msg;
      } else if (roomData.player2.length > 0) {
        msg.msg = "room is already full";
        return msg;
      } else {
        const res = await roomRef.update({player2: context.auth.uid, players: [roomData.player1, context.auth.uid]}).then((res) => {
          return res;
        }, (error) => {
          console.log(`write room document error: ${error}`);
          return null;
        });
        if (res) {
          msg.success = true;
          msg.roomId = data.roomId;
          msg.msg = "joined room successfully";
        } else {
          msg.success = false;
          msg.msg = "room document write failed";
        }
        return msg;
      }
    } else {
      msg.msg = "not authorized";
      return msg;
    }
  }
);

exports.requestJoinedRooms = functions.https.onCall(async (data: IRequestJoinedRoomsReq, context: functions.https.CallableContext) => {
  const msg: IRequestJoinedRoomsRes = {
    success: false,
    msg: "",
    rooms: [],
  };
  if (context.auth) {
    const res = await db.collection("rooms").where("players", "array-contains", context.auth.uid).get().then((res) => {
      return res;
    }, (error) => {
      console.log(`error fetching rooms. error: ${error}`);
      return null;
    });

    if (res) {
      const rooms: Room[] = [];

      res.forEach((doc) => {
        rooms.push(doc.data() as Room);
      });

      msg.success = true;
      msg.msg = `room fetch successful. number of rooms: ${res.size}`;
      msg.rooms = rooms;
      return msg;
    } else {
      msg.msg = "cloud functions fetch room error";
      return msg;
    }
  } else {
    msg.msg = "not authorized";
    return msg;
  }
});

exports.requestRoomData = functions.https.onCall( async (data: IRequestRoomDataReq, context: functions.https.CallableContext ) => {
  const msg: IRequestRoomDataRes = {
    success: false,
    msg: "",
    roomData: null,
  };

  if (context.auth) {
    const res = await db.doc(`rooms/${data.roomId}`).get();
    if (res.exists) {
      const roomData = res.data() as RoomWithOpponent;
      const inRoom = roomData.players.includes(context.auth.uid);
      if (inRoom) {
        let opponentId;
        if (context.auth.uid === roomData.player1) opponentId = roomData.player2;
        else opponentId = roomData.player1;

        const opponent = await getUser(opponentId);
        if (opponent) {
          msg.msg = "Get room data successful. Opponent Joined";
        } else if (opponentId === "") {
          msg.msg = "Get room data successful. Opponent Not Joined";
        } else {
          msg.msg = "Get room data successful. Opponent Not Found In Database.";
        }

        roomData.opponent = opponent;
        msg.roomData = roomData;
        msg.success = true;
        return msg;
      } else {
        msg.msg = `user: ${context.auth.uid} is not in this room`;
        return msg;
      }
    } else {
      msg.msg = "room not found";
      return msg;
    }
  } else {
    msg.msg = "not authorized";
    return msg;
  }
});
