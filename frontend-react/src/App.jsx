import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import Calender from "./Calender";
import { useEffect } from "react";
import { appActions } from "./services/appReducer";
import Api from "./Api";
import CalenderPopup from "./components/CalenderPopup";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let savedUid = localStorage.getItem("uid");
    if (savedUid) {
      dispatch(appActions.setUid(savedUid));
    } else {
      Api.get("/createUid").then(({ data }) => {
        console.log({ data });
        dispatch(appActions.setUid(data.uid));
      });
    }
  }, []);
  return (
    <div className="App">
      <Calender />
      <CalenderPopup />
    </div>
  );
}

export default App;
