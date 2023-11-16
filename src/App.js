import logo from "./logo.svg";
import "./App.css";
import FirebaseApp from "./firebase/FirebaseApp";
import FirebaseAuthen from "./firebase/FirebaseAuthen";

function App() {
  return (
    <div>
      {/* <FirebaseApp></FirebaseApp> */}
      <FirebaseAuthen></FirebaseAuthen>
    </div>
  );
}

export default App;
