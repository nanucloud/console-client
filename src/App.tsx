import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import React, { ReactNode } from "react";
import OAuthHandlerPage from "./pages/common/OAuthHandlerPage";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const hasAccessToken = localStorage.getItem("NANU_CONSOLE_ACCESS");

  if (!hasAccessToken) {
    const OAUTH_URI =
      "https://id.nanu.cc/oauth?app_name=NANU%20Cloud%20Console&auth_scope=[%22EMAIL%22,%22NAME%22]&redirect_uri=https://console.nanu.cc/oauth/handler&app_id=8223c3f4-3c8c-45c9-99ef-0ccacab41e3f";
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

                <Route
                  path="/oauth/handler"
                  element={
                      <OAuthHandlerPage />
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