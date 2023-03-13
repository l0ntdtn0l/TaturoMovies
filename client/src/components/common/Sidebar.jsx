import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from './Logo';
import uiConfigs from '../../configs/ui.configs';
import menuConfigs from '../../configs/menu.configs';
import { themeModes } from '../../configs/theme.configs';
import { setThemeMode } from '../../redux/features/themeModeSlice';

import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon, Stack, Toolbar, Typography } from '@mui/material';

const Sidebar = ({ open, toggleSidebar }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { appState } = useSelector((state) => state.appState);
    const { themeMode } = useSelector((state) => state.themeMode);

    const sidebarWidth = uiConfigs.size.sidebarWidth;

    const onSwitchTheme = () => {
        const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
        dispatch(setThemeMode(theme));
    };

    const drawer = (
        <>
            <Toolbar sx={{ paddingY: '20px', color: 'text.primary' }}>
                <Stack width="100%" direction="row" justifyContent="center">
                    <Logo />
                </Stack>
            </Toolbar>

            <List sx={{ paddingY: '30px' }}>
                <Typography variant="h6" marginLeft="20px" marginBottom="10px">
                    MENU
                </Typography>
                {menuConfigs.main.map((item, index) => (
                    <ListItemButton
                        key={index}
                        sx={{
                            borderRadius: '10px',
                            marginY: 1,
                            backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset',
                        }}
                        component={Link}
                        to={item.path}
                        onClick={() => toggleSidebar(false)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={<Typography textTransform="uppercase">{item.display}</Typography>}
                        />
                    </ListItemButton>
                ))}

                {user && (
                    <>
                        <Typography variant="h6" marginLeft="20px" marginBottom="10px">
                            PERSONNAL
                        </Typography>
                        {menuConfigs.user.map((item, index) => (
                            <ListItemButton
                                key={index}
                                sx={{
                                    borderRadius: '10px',
                                    marginY: 1,
                                    backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset',
                                }}
                                component={Link}
                                to={item.path}
                                onClick={() => toggleSidebar(false)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    primary={<Typography textTransform="uppercase">{item.display}</Typography>}
                                />
                            </ListItemButton>
                        ))}
                    </>
                )}

                <Typography variant="h6" margin="10px 20px">
                    THEME
                </Typography>
                <ListItemButton onClick={onSwitchTheme}>
                    <ListItemIcon>
                        {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                        {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
                    </ListItemIcon>

                    <ListItemText
                        disableTypography
                        primary={
                            <Typography textTransform="uppercase">
                                {themeMode === themeModes.dark ? 'dark mode' : 'light mode'}
                            </Typography>
                        }
                    />
                </ListItemButton>
            </List>
        </>
    );
    return (
        <Drawer
            open={open}
            onClose={() => toggleSidebar(false)}
            sx={{
                '& .MuiDrawer-Paper': {
                    boxSizing: 'border-box',
                    width: sidebarWidth,
                    borderRight: '0px',
                },
            }}
        >
            {drawer}
        </Drawer>
    );
};

export default Sidebar;
