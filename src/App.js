import styles from "./App.module.css";

//routes
import Routes from "./Routes";

//firebase
import Firebase, {FirebaseContext} from "./Firebase";

//components
import {NavBar} from "./components/modules";

const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <div className={styles.App}>
        <NavBar />
        <div className={styles.content}>
          <Routes />
        </div>
      </div>
    </FirebaseContext.Provider>
  );
};

export default App;
