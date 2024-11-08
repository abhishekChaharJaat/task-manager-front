// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import TasksList from "./pages/TasksList";
import ProtectedRoute from "./components/ProtectedRoute";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <Router>
      <AppContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppContextProvider>
    </Router>
  );
}

export default App;
