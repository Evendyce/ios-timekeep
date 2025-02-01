import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes inside Layout */}
        <Route element={<Layout />}>
          <Route index element={<Home />} /> {/* Renders at `/` */}
          <Route path="tasks" element={<Tasks />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;