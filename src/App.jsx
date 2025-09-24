import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import ChartsPage from "./pages/ChartsPage";
import DataTables from "./pages/DataTables";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login route (redirect to dashboard if already authenticated) */}
        <Route element={<RedirectIfAuth user={user} />}> 
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Route>

        {/* Protected routes */}
        <Route element={<RequireAuth user={user} />}> 
          <Route path="/" element={<Layout user={user} setUser={setUser} />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blog" element={<Blog />} />
            <Route path="charts" element={<ChartsPage />} />
            <Route path="data-tables" element={<DataTables />} />
            <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function RequireAuth({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

function RedirectIfAuth({ user }) {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
