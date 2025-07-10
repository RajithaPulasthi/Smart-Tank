import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserManagement from "../pages/Admin/UserManagement/UserMnagement";
import ProtectedLayout from "../layout/ProtectedLayout";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) =>
  isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* All protected pages go here */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/user"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <UserManagement />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="*"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
