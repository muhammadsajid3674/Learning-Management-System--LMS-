import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { handleLogOut } from '../../../config/firebaseMethods';
import { MuiButton } from '../../../components/button/button';
import StdProfile from './Profile';
import Results from './Results';
import SelectQuiz from './SelectQuiz';
import Quiz from './StartQuiz';
import Announcement from './announcement';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function StdLayout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [menuLinks, setMenuLinks] = React.useState([
        {
            displayName: "Profile",
            routeName: "",
            iconClass: "fa-solid fa-user"
        },
        {
            displayName: "Select Quiz",
            routeName: "selectQuiz",
            iconClass: "fa-solid fa-question"
        },
        {
            displayName: "Announcement",
            routeName: "announcement",
            iconClass: "fa-solid fa-circle-info"
        },
        {
            displayName: "Results",
            routeName: "results",
            iconClass: "fa-solid fa-square-poll-vertical"
        },
    ]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#212529',
            },
            custom: {
                main: '#e76f51',
            },
            light: {
                main: '#fff',
            },
        },
    });

    const navigate = useNavigate();

    let clickNavigate = (routeName) => {
        navigate(routeName);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logOut = () => {
        return handleLogOut()
            .then((res) => {
                navigate('/login')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <ThemeProvider theme={darkTheme}>
                <AppBar position="fixed" open={open} color='light' sx={{ boxShadow: 'none' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className='text-dark' variant="h6" component="div" sx={{ flexGrow: 1, color: "#fff" }}>
                            Student Panel
                        </Typography>
                        <MuiButton color='customStd' onClick={logOut} label='Logout' />
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#0c4b74',
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton className='text-light' onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuLinks.map((x, i) => (
                        <ListItem key={i} disablePadding>
                            <ListItemButton onClick={() => clickNavigate(x.routeName)}>
                                <ListItemIcon className='text-light'>
                                    <i className={x.iconClass}></i>
                                </ListItemIcon>
                                <ListItemText className='text-light' primary={x.displayName} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open} sx={{ backgroundColor: '#ced4da', minHeight: '100vh' }}>
                <DrawerHeader />
                <Routes>
                    <Route path='' element={<StdProfile />} />
                    <Route path='selectQuiz' element={<SelectQuiz />} />
                    <Route path='announcement' element={<Announcement />} />
                    <Route path='results' element={<Results/>}/>
                    <Route path='selectQuiz/startQuiz' element={<Quiz/>}/>
                </Routes>
            </Main>
        </Box>
    );
}