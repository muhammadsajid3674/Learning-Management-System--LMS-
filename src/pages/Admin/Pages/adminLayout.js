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
import Courses from './Courses';
import CreateResult from './CreateResult';
import Quiz from './QuizForm';
import RegisterStd from './RegisterStd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Countries from './Countries';
import City from './City';
import { handleLogOut } from '../../../config/firebaseMethods';
import { MuiButton } from '../../../components/button/button';
import TrainerReg from './trainer';
import FormControl from './FormControl';

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

export default function AdminLayout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [menuLinks, setMenuLinks] = React.useState([
        {
            displayName: "Overview",
            routeName: "",
            iconClass: "fa-solid fa-list"
        },
        {
            displayName: "Quiz",
            routeName: "quiz",
            iconClass: "fa-solid fa-question"
        },
        {
            displayName: "Courses",
            routeName: "courses",
            iconClass: "fa-solid fa-comment"
        },
        {
            displayName: "Form Control",
            routeName: "FormControl",
            iconClass: "fa-solid fa-circle-info"
        },
        {
            displayName: "Trainer Registration",
            routeName: "trainerReg",
            iconClass: "fa-solid fa-user"
        },
        {
            displayName: "Create Result",
            routeName: "createResult",
            iconClass: "fa-solid fa-square-poll-vertical"
        },
        {
            displayName: "Country",
            routeName: "countries",
            iconClass: "fa-solid fa-globe"
        },
        {
            displayName: "City",
            routeName: "city",
            iconClass: "fa-solid fa-city"
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
                <AppBar position="fixed" open={open} color='primary'>
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
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#fff" }}>
                            Admin Panel
                        </Typography>
                        <MuiButton color='custom' onClick={logOut} label='Logout'/>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuLinks.map((x, i) => (
                        <ListItem key={i} disablePadding>
                            <ListItemButton onClick={() => clickNavigate(x.routeName)}>
                                <ListItemIcon>
                                    <i className={x.iconClass}></i>
                                </ListItemIcon>
                                <ListItemText primary={x.displayName} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open} sx={{ backgroundColor: '#ced4da' }}>
                <DrawerHeader />
                <Routes>
                    <Route path='' element={<RegisterStd />} />
                    <Route path='quiz' element={<Quiz />} />
                    <Route path='courses' element={<Courses />} />
                    <Route path='FormControl' element={<FormControl />} />
                    <Route path='trainerReg' element={<TrainerReg/>}/>
                    <Route path='createResult' element={<CreateResult />} />
                    <Route path='countries' element={<Countries />} />
                    <Route path='city' element={<City />} />
                </Routes>
            </Main>
        </Box>
    );
}