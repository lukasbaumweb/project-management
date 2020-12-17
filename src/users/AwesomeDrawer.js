import React from 'react';
import clsx from 'clsx';
import {
  Drawer,
  AppBar,
  makeStyles,
  useTheme,
  Toolbar,
  IconButton,
  Typography,
  ListItem,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  Avatar,
  InputBase,
  fade,
  Slide,
  useScrollTrigger,
} from '@material-ui/core/';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';

import placeHolderImage from './../assets/profile/profile-image-default.svg';

import fire from './../fire';

import { Link, useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 'auto!important',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  centerMe: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({ target: window });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const AwesomeDrawer = ({ user, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signOut = () => {
    fire.auth
      .signOut()
      .then(() => history.push('/'))
      .catch((err) => console.error(err));
  };

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar>
            {/**  variant='dense' TODO: Make dense a setting thus the user can decide */}
            <IconButton
              color='inherit'
              aria-label='Öffne Sidebar'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>
              Project Management
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    alert('Work in progress');
                  }
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to='/' key={'currentUser'}>
            <ListItemIcon>
              <Avatar
                alt={user?.displayName}
                src={user?.photoURL || placeHolderImage}
              />
            </ListItemIcon>
            <ListItemText primary={fire.auth.currentUser.displayName} />
          </ListItem>
          <ListItem button component={Link} to='/' key={'Dashboard'}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
          <ListItem button component={Link} to='/boards' key={'Board'}>
            <ListItemIcon>
              <DeveloperBoardIcon />
            </ListItemIcon>
            <ListItemText primary={'Board'} />
          </ListItem>
          <Divider />
          <ListItem
            button
            component={Link}
            to='/settings'
            key={'Einstellungen'}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={'Einstellungen'} />
          </ListItem>
          <Divider />
          <ListItem button key={'Abmelden'} onClick={signOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Abmelden'} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default AwesomeDrawer;
