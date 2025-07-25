import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserManagement from "../pages/Admin/UserManagement/UserMnagement";
import CustomerManagement from "../pages/Users/CustomerManagement";
import StoreAdminManagement from "../pages/Users/StoreAdminManagement";
import Profile from "../pages/Profile/Profile";
import StoreManagement from "../pages/Store/StoreManagement";
import FishManagement from "../pages/Fish/FishManagement";
import Orders from "../pages/Orders/Orders";
import ProtectedLayout from "../layout/ProtectedLayout";
import DeviceManagement from "../pages/Device/DeviceManagement";

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
        path="/users/customer"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <CustomerManagement />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/users/store-admin"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <StoreAdminManagement />
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
        path="/fish"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <FishManagement />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <Orders />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/device"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <DeviceManagement />
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
