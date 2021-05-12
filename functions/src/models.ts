interface Room {
  id: string;
  player1: Player;
  player2: Player;
  questions: Question[];
}

interface Player {
  id: "1" | "2";
  name: string;
  profilePic: string;
}

interface PlayerIds {
  ids: [string, string];
  player1: {
    id: string;
    joined: boolean;
  };
  player2: {
    id: string;
    joined: boolean;
  };
}

interface Question {
  askerId: "1" | "2";
  question: string;
  player1Ans: string;
  player2Ans: string;
  roomRef: string;
  timeStamp: Date;
}

interface User {
  uid: string;
}

interface RoomKeyPair {
  shortKey: string;
  roomId: string;
}

export {Room, Player, Question, PlayerIds, User, RoomKeyPair};
