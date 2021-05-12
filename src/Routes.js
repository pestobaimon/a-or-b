import {Switch, Route} from "react-router-dom";
import {GuardedSignInRoute} from "./RouteGuards";

//pages
import {NameSelect, Room, RoomSelect, SignIn} from "./pages";

const Routes = () => (
  <Switch>
    <Route exact path="/sign-in" component={SignIn} />
    <GuardedSignInRoute exact path="/" component={RoomSelect} />
    <GuardedSignInRoute path="/room" component={Room} />
  </Switch>
);

export default Routes;
