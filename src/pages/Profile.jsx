import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function Profile({ user, setUser }) {
  const navigate = useNavigate();

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleDelete = () => {
    alert("Account deleted (demo only)");
    setUser(null);
    navigate("/login");
  };

  const handleSavePassword = () => {
    setSavedMessage("New password saved");
    setShowChangePassword(false);
    setCurrentPassword("");
    setNewPassword("");
    // You could integrate actual save logic here
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: "white" }}>
        Profile
      </Typography>

      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
          }}
        >
          {/* Username */}
          <TextField
            label="Username"
            value={user.username}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputBase-input": { color: "blue" }, // input text color
              "& .MuiInputLabel-root": { color: "blue" }, // label color
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "blue",
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "blue",
                },
              "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "blue",
                },
            }}
          />

          {/* Password */}
          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputLabel-root": { color: "blue" },
              "& .MuiOutlinedInput-input": { color: "blue" },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "blue",
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "blue",
                },
              "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "blue",
                },
              "& .MuiSvgIcon-root": { color: "blue" },
            }}
          >
            <InputLabel htmlFor="outlined-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              readOnly
              label="Password"
            />
          </FormControl>

          {/* Change Password Section */}
          {!showChangePassword && (
            <Button
              variant="outlined"
              onClick={() => setShowChangePassword(true)}
              sx={{ alignSelf: "flex-start" }}
            >
              Change Password
            </Button>
          )}

          {showChangePassword && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {savedMessage && (
                <Typography variant="body2" color="success.main">
                  {savedMessage}
                </Typography>
              )}
              <TextField
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
              />
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleSavePassword}
              >
                Save
              </Button>
            </Box>
          )}

          {/* Action Buttons */}
          {!showChangePassword && (
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete Account
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
