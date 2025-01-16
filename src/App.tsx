import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

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
            <div className="max-w-[1000px] mx-auto px-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;