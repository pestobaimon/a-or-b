/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import getRanHex from "./hexDigits";
import {Room, PlayerIds} from "./models";

admin.initializeApp();
const db = admin.firestore();

exports.requestNewRoom = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    let exists = true;
    let roomId = "";
    while (exists) {
      roomId = getRanHex(6);
      const room = await db.doc(`rooms/${roomId}`).get();
      exists = room.exists;
    }
    const newRoom: Room = {
      id: roomId,
      player1: {
        id: "1",
        name: "",
        profilePic:
          "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      },
      player2: {
        id: "2",
        name: "",
        profilePic:
          "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      },
      questions: [],
    };
    await db.collection("rooms").doc(roomId).set(newRoom);
    const playerIds: PlayerIds = {
      ids: [data.uid, ""],
      player1: {
        id: data.uid,
        joined: true,
      },
      player2: {
        id: "",
        joined: false,
      },
    };

    await db.doc(`rooms/${roomId}/playerIds/ids`).set(playerIds);
    return {room: newRoom};
  }
);
