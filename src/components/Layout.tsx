import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { FiHome, FiClipboard, FiBarChart2, FiChevronLeft, FiChevronRight, FiUser } from "react-icons/fi";
import logoWide from "./../assets/logo/IOS_Wide_Logo.png";
import logoSquare from "./../assets/logo/IOS_Square_Logo.png";
import profilePhoto from "./../assets/images/icons/User_Profile.jpg";

import "./Layout.css";
import { useAuth } from "../context/AuthContext";

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const { logout } = useAuth();
  let touchStartX = 0;
  let mouseStartX = 0;
  let isDragging = false;

  // Handle touch gestures for swipe interaction
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    /** Handles touch start (for mobile swipe) */
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    /** Handles touch move (for mobile swipe) */
    const handleTouchMove = (e: TouchEvent) => {
        const touchEndX = e.touches[0].clientX;
        const difference = touchEndX - touchStartX;

        if (difference > 30) setSidebarOpen(true); // Swipe Right → Expand
        else if (difference < -30) setSidebarOpen(false); // Swipe Left → Collapse
    };

    /** Handles mouse click start (requires click to activate dragging) */
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      mouseStartX = e.clientX;
    };

    /** Handles mouse move (only works if user is dragging) */
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return; // Don't do anything if not dragging
      const mouseEndX = e.clientX;
      const difference = mouseEndX - mouseStartX;

      if (difference > 30) setSidebarOpen(true); // Drag Right → Expand
      else if (difference < -30) setSidebarOpen(false); // Drag Left → Collapse
    };

    /** Handles mouse release (stops dragging) */
    const handleMouseUp = () => {
      isDragging = false;
    };

    // Add event listeners
    sidebar.addEventListener("touchstart", handleTouchStart);
    sidebar.addEventListener("touchmove", handleTouchMove);
    sidebar.addEventListener("mousedown", handleMouseDown);
    sidebar.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp); // Detects when the mouse button is released anywhere

    return () => {
      // Cleanup event listeners
      sidebar.removeEventListener("touchstart", handleTouchStart);
      sidebar.removeEventListener("touchmove", handleTouchMove);
      sidebar.removeEventListener("mousedown", handleMouseDown);
      sidebar.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside ref={sidebarRef} className={`bg-primary text-white w-64 min-h-screen custom-sidebar sidebar ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        {/* Company Logo */}
        <div className="sidebar-logo">
            {isSidebarOpen ? (
            <img src={logoWide} alt="Company Logo" className="logo wide-logo" />
            ) : (
            <img src={logoSquare} alt="Company Icon" className="logo icon-logo" />
            )}
        </div>

        {/* Main Content and User Card */}
        <div className="sidebar-content">
            <nav>
            <ul>
                <li>
                <Link to="/home" className="nav-item">
                    <FiHome size={24} />
                    {isSidebarOpen && <span>Dashboard</span>}
                </Link>
                </li>
                <li>
                <Link to="/users" className="nav-item">
                    <FiUser size={24} />
                    {isSidebarOpen && <span>Users</span>}
                </Link>
                </li>
                <li>
                <Link to="/tasks" className="nav-item">
                    <FiClipboard size={24} />
                    {isSidebarOpen && <span>Tasks</span>}
                </Link>
                </li>
                <li>
                <Link to="/reports" className="nav-item">
                    <FiBarChart2 size={24} />
                    {isSidebarOpen && <span>Reports</span>}
                </Link>
                </li>
            </ul>
            </nav>
            {/* User Card */}
            <div className="user-card">
                    <img
                        src={profilePhoto}
                        alt="User Profile"
                        className="user-avatar"
                    />
                    {isSidebarOpen && (
                        <div className="user-info">
                            <p className="user-name">John Doe</p>
                            <p className="current-ticket">Ticket #12345</p>
                            <p className="time-tracking">Elapsed: 00:25:12</p>
                            <button className="mt-2 bg-red-500 px-4 py-2 rounded" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
        </div>

        {/* Toggle Button on Sidebar Edge */}
        <div className="sidebar-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
      <header className="header">
          <h1 className="text-lg font-bold">Time Tracker</h1>
        </header>

        <main className="content">
          <Outlet />
        </main>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Time Tracker App</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;