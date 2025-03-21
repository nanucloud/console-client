import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import React, { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const hasAccessToken = document.cookie.includes('ACCESS=');
  
  if (!hasAccessToken) {
    const OAUTH_URI = 'https://id.nanu.cc/oauth?app_name=NANU%20Cloud%20Console&auth_scope=[%22EMAIL%22]&redirect_uri=https://donghyun.cc/oauth_handler&app_id=7040dad6-b0ed-4b83-ab13-35535e39822e';
    window.location.href = OAUTH_URI;
    return null;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={true}
        style={{ marginTop: "64px" }}
      />
      <div className="flex h-screen bg-gray-50">
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-auto bg-gray-100">
            <div className="max-w-[1300px] mx-auto px-6">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;