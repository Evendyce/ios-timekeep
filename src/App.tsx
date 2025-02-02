import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Users from "./pages/Users";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";



const App: React.FC = () => {
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      {/* Wrap all routes inside Layout */}
      <Route element={<Layout />}>
        <Route index path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} /> {/* Renders at `/` */}
        <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;