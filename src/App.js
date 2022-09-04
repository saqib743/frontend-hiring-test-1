import "./App.css";

import { ThemeProvider } from "@mui/styles";

import theme from "./resources/themes/themes";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import SignIn from "./components/views/SignIn";
import Banner from "./components/banner";
import Main from "./components/views/Main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authenticateAlreadySignedInUser } from "./store/auth/auth";

function App() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.loggedIn) {
      navigate("/main");
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.loggedIn) {
      dispatch(authenticateAlreadySignedInUser());
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Banner />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
