import { useState } from "react";
import Question from "./pages/Question/Question";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserSelect from "./pages/UserSelect/UserSelect";
import { UserContextProvider } from "./context";
import styles from "./App.module.css";
import RoomSelect from "./pages/RoomSelect/RoomSelect";
import GuardedQuestionRoute from "./GuardedQuestionRoute";
import GuardedUserSelectRoute from "./GuardedUserSelectRoute";

function App() {
    const [user, setUser] = useState(null);
    const [oppositeUser, setOppositeUser] = useState(null);
    const [room, setRoom] = useState(null);

    return (
        <div className={styles.App}>
            <div className={styles.container}>
                <UserContextProvider value={{ user, oppositeUser, room }}>
                    <Router>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <RoomSelect {...props} setRoom={setRoom} room={room} />
                                )}
                            />
                            <GuardedUserSelectRoute
                                exact
                                path="/user-select"
                                room={room}
                                component={UserSelect}
                                setUser={setUser}
                                setOppositeUser={setOppositeUser}
                            />
                            <GuardedQuestionRoute
                                exact
                                path="/ask"
                                room={room}
                                user={user}
                                component={Question}
                            />
                        </Switch>
                    </Router>
                </UserContextProvider>
            </div>
        </div>
    );
}

export default App;
