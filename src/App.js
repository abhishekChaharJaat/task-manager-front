// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import TasksList from "./pages/TasksList";
import ProtectedRoute from "./components/ProtectedRoute";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <React.StrictMode>
      <div className="max-w-[1440px] mx-auto">
        <Router>
          <AppContextProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TasksList />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppContextProvider>
        </Router>
      </div>
    </React.StrictMode>
  );
}

export default App;
