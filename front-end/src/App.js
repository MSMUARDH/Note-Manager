import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/ProtectedRoute";

// Pages
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import UpdatePage from "./Pages/UpdatePage";
import CreateNotePage from "./Pages/CreateNotePage";
import ViewNotePage from "./Pages/ViewNotePage";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <div>
      <BrowserRouter>
        {loading && (
          <div className="spinner-parent">
            <div className="spinner-border" role="status"></div>
          </div>
        )}

        <ToastContainer position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-note"
            element={
              <ProtectedRoute>
                <CreateNotePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-note/:id"
            element={
              <ProtectedRoute>
                <UpdatePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-note/:id"
            element={
              <ProtectedRoute>
                <ViewNotePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
