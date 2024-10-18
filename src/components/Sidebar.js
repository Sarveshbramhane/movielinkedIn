import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Avatar,
  Divider,
  Box,
  Typography,
  colors,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TheatersIcon from "@mui/icons-material/Theaters";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ScienceIcon from "@mui/icons-material/Science"; // Sci-Fi category
import AnimationIcon from "@mui/icons-material/Animation"; // Animation category
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // Musical category
import HistoryIcon from "@mui/icons-material/History"; // Historical category
import FamilyIcon from "@mui/icons-material/FamilyRestroom"; // Family category
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DramaIcon from "@mui/icons-material/TheaterComedy"; // Alternative icon for Drama

const drawerWidth = 240;

function ResponsiveDrawer() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = React.useState("Popular");

  const categories = [
    { name: "Popular", icon: <WhatshotIcon />, path: "/" },
    { name: "Action", icon: <MovieIcon />, path: "/action" },
    { name: "Adventure", icon: <LocalMoviesIcon />, path: "/adventure" },
    { name: "Comedy", icon: <TheatersIcon />, path: "/comedy" },
    { name: "Drama", icon: <DramaIcon />, path: "/drama" },
    { name: "Animation", icon: <AnimationIcon />, path: "/animation" },
    { name: "Musical", icon: <MusicNoteIcon />, path: "/musical" },
    { name: "Historical", icon: <HistoryIcon />, path: "/historical" },
    { name: "Family", icon: <FamilyIcon />, path: "/family" },
  ];

  const handleNavigation = (path, name) => {
    setActiveItem(name);
    navigate(path);
  };

  const drawer = (
    <div sx={{backgroundColor:"#003135"}}>
      <Toolbar>
        {/* User Profile Section */}
        <Box
        
          display="flex"
          flexDirection="column"
          alignItems="left"
          p={1}
          bgcolor="#0" // Solid blue background for user profile section
          borderRadius="8px"
        >
          <Avatar
            sx={{ width: 65, height: 64, mb: 1,ml:6, border: "2px solid white" }}
            src="/path-to-profile-pic.jpg"
            alt="User Profile"
          />
          <Typography variant="h6">Sarvesh Bramhane</Typography>
          <Typography variant="body2" sx={{ ml:-3,color:"white" }}>
            sarveshBramhane175@gmail.com
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ bgcolor: "#024950" }} />
      <List>
        {categories.map((category) => (
          <ListItem key={category.name} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(category.path, category.name)}
              sx={{
                backgroundColor:
                  activeItem === category.name ? "#024950" : "transparent", // Darker blue for active item
                "&:hover": {
                  backgroundColor: "#024950", // Solid blue on hover
                },
                borderRadius: "4px",
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{category.icon}</ListItemIcon>
              <ListItemText
                primary={category.name}
                sx={{ color: "white" }}
                primaryTypographyProps={{
                  fontSize: "1rem",
                  fontWeight: activeItem === category.name ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: "#024950", mt: "auto" }} />
      {/* Settings Section */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/settings", "Settings")}
            sx={{
              "&:hover": {
                backgroundColor: "#024950",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              sx={{ color: "white" }}
              primaryTypographyProps={{
                fontSize: "1rem",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/logout", "Logout")}
            sx={{
              "&:hover": {
                backgroundColor: "#024950",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{ color: "white" }}
              primaryTypographyProps={{
                fontSize: "1rem",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          backgroundColor: "#003135", // Solid blue background for sidebar
          color: "white",
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
}

export default ResponsiveDrawer;
