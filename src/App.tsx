import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ErrorPage } from "./pages/ErrorPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { UnprivilegedPage } from "./pages/UnprivilegedPage";
import { OperationsHistoryPage } from "./pages/OperationsHistoryPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/operations-history"
              element={<OperationsHistoryPage />}
            />
          </Route>
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/error" element={<UnprivilegedPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
