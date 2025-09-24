import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ user, pageTitle, onToggleSidebar }) {
  return (
    <>
      <IconButton color="inherit" edge="start" onClick={onToggleSidebar} sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {pageTitle}
      </Typography>
      {user ? (
        <Typography variant="body1">{user.username}</Typography>
      ) : null}
    </>
  );
}
