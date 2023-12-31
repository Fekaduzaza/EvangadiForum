import { useEffect } from "react";
import "./App.css";
import { useUserContext } from "./Context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import axios from "axios";
import SharedLayout from "./Shared/SharedLayout";
import Question from "./Pages/Question/Question";
import Answer from "./Pages/Answer/Answer";
import Profile from "./Pages/Profile/Profile";

function App() {
  const [userData, setUserData] = useUserContext();

  const checkLoggedIn = async () => {

    let token = localStorage.getItem("auth-token");

    if (!token) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      const userRes = await axios.get("http://localhost:2000/api/users", {
        headers: { "x-auth-token": token },
      });

      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }
  };

  useEffect(() => {
    checkLoggedIn();
  },[]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              path="/signup"
              element={
                <>
                  <SignUp />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route
              path="/question"
              element={
                <>
                  <Question />
                </>
              }
            />
            <Route
              path="/answer"
              element={
                <>
                  <Answer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Profile />
                </>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
