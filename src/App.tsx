import "./App.css";
import { useAppDispatch } from "store";
import Addcomment from "./components/Addcomment";
import Comments from "./components/Comments";
import { useEffect } from "react";
import { loadUser } from "store/user-actions";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div className="App">
      <Comments />
      <Addcomment />
    </div>
  );
}

export default App;
