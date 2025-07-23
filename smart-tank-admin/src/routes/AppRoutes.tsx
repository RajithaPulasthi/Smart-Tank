import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserManagement from "../pages/Admin/UserManagement/UserMnagement";
import Users from "../pages/Users/Users";
import Profile from "../pages/Profile/Profile";
import StoreManagement from "../pages/Store/StoreManagement";
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
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
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
        path="/user"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <Users />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/store"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <StoreManagement />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <Profile />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />

      {/* Catch-all fallback */}
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
