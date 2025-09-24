import { Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Sidebar from "./Sidebar";
import Header from "./Header";

const SIDEBAR_WIDTH_EXPANDED = 240;
const SIDEBAR_WIDTH_COLLAPSED = 72;

export default function Layout({ user, setUser }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const path = location.pathname.replace(/^\/+/, "");
    if (!path || path === "dashboard") return "Dashboard";
    if (path.startsWith("blog")) return "Blogs";
    if (path.startsWith("charts")) return "Charts";
    if (path.startsWith("data-tables")) return "Data Tables";
    if (path.startsWith("profile")) return "Profile";
    return "Dashboard";
  }, [location.pathname]);

  const drawerWidth = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(90deg, #000 0%, #0b1a4a 50%, #0b1a66 100%)"
        }}
      >
        <Toolbar sx={{ minHeight: 64, display: "flex", alignItems: "center" }}>
          <Header
            user={user}
            setUser={setUser}
            pageTitle={pageTitle}
            onToggleSidebar={() => setCollapsed((c) => !c)}
          />
        </Toolbar>
      </AppBar>

      <Sidebar collapsed={collapsed} drawerWidth={drawerWidth} setUser={setUser} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: "64px",
          height: "calc(100vh - 64px)",
          overflow: "auto",
          background: "linear-gradient(180deg, #071335 0%, #0b1a4a 60%, #0b1a66 100%)"
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
