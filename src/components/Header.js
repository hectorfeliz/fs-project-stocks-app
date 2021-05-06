import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import appIcon from "../img/logo.svg";
import "../css/Header.css";
import Avatar from "@material-ui/core/Avatar";


import Search from "./Search";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  const { isAuthenticated, user, isLoading } = useAuth0();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  let button = "",
    helloMessage = "";

  if (!isLoading) {
    if (isAuthenticated) {
      button = <LogoutButton />;

      helloMessage = (
        <Typography component="span" noWrap>
          Hello, {user.nickname}
        </Typography>
      );
    } else {
      button = <LoginButton />;
    }
  }

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container spacing={3} fixed>
          <Toolbar className="header">
            <div className={`logo__container`}>
              <img
                src={appIcon}
                className="header__logo"
                alt="App Logo"
                width="32"
              />
              <Typography className={classes.title} variant="h6" noWrap>
                Invest Trackr
              </Typography>
            </div>

            <div className={`${classes.search} search__container`}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <Search
                className=""
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>

            <div className={` login__container`}>
              {helloMessage}

              {isAuthenticated && !isLoading && (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar alt="Remy Sharp" src={user.picture} />
                </IconButton>
              )}


            {isAuthenticated && !isLoading && (
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
             
                <LogoutButton/>
              </Menu>
            )}
            

            {!isAuthenticated && !isLoading && <LoginButton />}



            </div>

        

        
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
