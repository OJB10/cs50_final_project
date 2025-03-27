import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Link,
  InputAdornment,
  Tooltip,
  Badge,
  useMediaQuery,
  useTheme as useMuiTheme,
  Button,
  Divider,
  Typography,
  Container,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useTheme } from "../../contexts/ThemeProvider";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

/**
 * Navbar Component
 *
 * The navigation bar at the top of the page. Includes a logo, search bar, and user profile section.
 *
 * @param {Object} props
 * @param {Function} [props.onLogout] - Optional callback for logout
 * @returns {JSX.Element} The Navbar component
 */
const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // Open dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Navigate to Profile Page
  const handleProfileClick = () => {
    navigate("/profile");
    handleMenuClose();
  };

  // Handle logout
  const handleLogout = async () => {
    handleMenuClose();
    
    // Use provided logout callback if available, otherwise use the default logout
    if (onLogout) {
      onLogout();
    } else {
      logout();
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: "primary.main",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link 
              component={RouterLink} 
              to="/" 
              sx={{ 
                display: "flex", 
                alignItems: "center",
                textDecoration: "none"
              }}
            >
              <img
                src="/images/navbar/temp_logo.png"
                alt="Dash Logo"
                style={{ 
                  maxHeight: isMobile ? "32px" : "40px", 
                  width: "auto",
                  marginRight: "12px"
                }}
              />
              <Typography 
                variant="h6" 
                className="h6" 
                sx={{ 
                  display: { xs: "none", sm: "block" },
                  color: "white",
                  fontWeight: "var(--font-weight-bold)",
                  letterSpacing: "0.5px"
                }}
              >
                Dash
              </Typography>
            </Link>
          </Box>

          {/* Search Bar Section - Hidden on mobile */}
          {!isMobile && (
            <Box sx={{ 
              width: { sm: "50%", md: "40%" }, 
              maxWidth: "500px", 
              mx: 2 
            }}>
              <TextField
                fullWidth
                placeholder="Search tasks..."
                variant="outlined"
                size="small"
                value={searchValue}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "background.paper",
                  borderRadius: "var(--border-radius-small)",
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'divider',
                    },
                  },
                }}
              />
            </Box>
          )}

          {/* Action Items */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Theme Toggle */}
            <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
              <IconButton 
                color="inherit" 
                onClick={toggleTheme}
                sx={{ mr: 1 }}
              >
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>

            {/* Notifications - Sample UI element */}
            <Tooltip title="Notifications">
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile Menu */}
            <Box>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleMenuOpen}
                  size="small"
                  aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                >
                  <Avatar
                    src="/images/navbar/temp_profile.png"
                    alt={user?.name || "User"}
                    sx={{
                      width: 40,
                      height: 40,
                      border: "2px solid white",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  elevation: 2,
                  sx: {
                    width: 220,
                    mt: 1,
                    overflow: 'visible',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle1" className="body-small font-semibold">
                    {user?.name || "User"}
                  </Typography>
                  <Typography variant="body2" className="caption" color="text.secondary">
                    {user?.email || "user@example.com"}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleProfileClick}>
                  <AccountCircleIcon fontSize="small" sx={{ mr: 2 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon fontSize="small" sx={{ mr: 2 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;