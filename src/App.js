import {useState} from "react";
import Room from "./pages/Room/Room";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NameSelect from "./pages/NameSelect/NameSelect";
import {UserContextProvider} from "./context";
import styles from "./App.module.css";
import RoomSelect from "./pages/RoomSelect/RoomSelect";
import {
  GuardedRoomRoute,
  GuardedNameSelectRoute,
  GuardedRoomSelectRoute,
  GuardedSignInRoute,
} from "./RouteGuards";
import Firebase, {FirebaseContext} from "./Firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import SignIn from "./pages/SignIn/SignIn";
import firebase from "firebase";

const fb = new Firebase();
const firebaseAppAuth = fb.auth;

const providers = {
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
};
const createComponentWithAuth = withFirebaseAuth({providers, firebaseAppAuth});

const App = ({
  /** These props are provided by withFirebaseAuth HOC */
  signInWithFacebook,
  signOut,
  setError,
  user,
  error,
  loading,
}) => {
  const [name, setName] = useState(null);
  const [oppositeUser, setOppositeUser] = useState(null);
  const [savedRooms, setSavedRooms] = useState(null);
  const [room, setRoom] = useState(null);

  return (
    <FirebaseContext.Provider value={fb}>
      <div className={styles.App}>
        <div className={styles.container}>
          <UserContextProvider
            value={{user, oppositeUser, room, name, setName}}
          >
            <Router>
              <Switch>
                <GuardedSignInRoute
                  exact
                  path="/"
                  user={user}
                  signInWithFacebook={signInWithFacebook}
                  component={SignIn}
                />
                <GuardedRoomSelectRoute
                  exact
                  path="/room-select"
                  user={user}
                  room={room}
                  setRoom={setRoom}
                  savedRooms={savedRooms}
                  setSavedRooms={setSavedRooms}
                  component={RoomSelect}
                />
                <GuardedNameSelectRoute
                  exact
                  path="/name-select"
                  room={room}
                  user={user}
                  component={NameSelect}
                  setName={setName}
                  setOppositeUser={setOppositeUser}
                />
                <GuardedRoomRoute
                  exact
                  path="/room"
                  room={room}
                  user={user}
                  name={name}
                  component={Room}
                />
              </Switch>
            </Router>
          </UserContextProvider>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
};

export default createComponentWithAuth(App);
