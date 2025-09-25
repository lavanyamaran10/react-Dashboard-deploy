import { NavLink, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/SpaceDashboard";
import NotesIcon from "@mui/icons-material/Notes";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ViewListIcon from "@mui/icons-material/ViewList";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, useMediaQuery, useTheme, Tooltip } from "@mui/material";

export default function Sidebar({ collapsed, drawerWidth, setUser }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const responsiveWidth = isSmallScreen ? 72 : drawerWidth;

  const items = [
    { to: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { to: "/blog", label: "Blogs", icon: <NotesIcon /> },
    { to: "/charts", label: "Charts", icon: <ShowChartIcon /> },
    { to: "/data-tables", label: "Data Tables", icon: <ViewListIcon /> },
    { to: "/profile", label: "Profile", icon: <PersonIcon /> },
  ];

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: responsiveWidth,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "width 0.3s", // smooth width transition
        [`& .MuiDrawer-paper`]: {
          width: responsiveWidth,
          boxSizing: "border-box",
          background:
            "linear-gradient(180deg, #071335 0%, #0b1a4a 60%, #0b1a66 100%)", // blue gradient background
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "width 0.3s, background 0.3s", // smooth transition
        },
      }}
      open
    >
      {/* Top nav items */}
      <List sx={{ mt: 8 }}>
        {items.map((item) => (
          <ListItem key={item.to} disablePadding>
            <Tooltip title={isSmallScreen ? item.label : ""} placement="right">
              <ListItemButton
                component={NavLink}
                to={item.to}
                sx={{
                  "&.active": { backgroundColor: "rgba(255,255,255,0.12)" },
                  transition: "all 0.3s", // smooth hover/active transition
                }}
              >
                <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && !isSmallScreen && (
                  <ListItemText primary={item.label} />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Bottom Logout button */}
      <Box>
        <ListItem disablePadding>
          <Tooltip title={isSmallScreen ? "Logout" : ""} placement="right">
            <ListItemButton
              onClick={handleLogout}
              sx={{ transition: "all 0.3s" }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              {!collapsed && !isSmallScreen && (
                <ListItemText primary="Logout" />
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </Box>
    </Drawer>
  );
}
