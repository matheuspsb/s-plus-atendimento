import MainCard from '@/components/ui/cards/MainCard';
import { appDrawerWidth, gridSpacing } from '@/constants/constant';
import { UserProfile } from '@/types/use-profile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AvatarStatus from './AvatarStatus';
import UserAvatar from './UserAvatar';
import UserList from './UserList';

interface ChatDrawerProps {
    handleDrawerOpen: () => void;
    openChatDrawer: boolean | undefined;
    setUser: (u: UserProfile) => void;
}

const ChatDrawer = ({ handleDrawerOpen, openChatDrawer, setUser }: ChatDrawerProps) => {
    const theme = useTheme();
    const downLG = useMediaQuery(theme.breakpoints.down('lg'));

    // show menu to set current user status
    const [anchorEl, setAnchorEl] = useState<Element | (() => Element) | null | undefined>();
    const handleClickRightMenu = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleCloseRightMenu = () => {
        setAnchorEl(null);
    };

    // set user status on status menu click
    const [status, setStatus] = useState('available');
    const handleRightMenuItemClick = (userStatus: string) => () => {
        setStatus(userStatus);
        handleCloseRightMenu();
    };

    const drawerBG = 'grey.50';

    return (
        <Drawer
            sx={{
                width: appDrawerWidth,
                flexShrink: 0,
                zIndex: { xs: 1100, lg: 0 },
                '& .MuiDrawer-paper': {
                    height: { xs: '100%', lg: 'auto' },
                    width: appDrawerWidth,
                    boxSizing: 'border-box',
                    position: 'relative',
                    border: 'none',
                    borderRadius: { sx: 'none', lg: 8 }
                }
            }}
            variant={downLG ? 'temporary' : 'persistent'}
            anchor="left"
            open={openChatDrawer}
            ModalProps={{ keepMounted: true }}
            onClose={handleDrawerOpen}
        >
            {openChatDrawer && (
                <MainCard
                    sx={{ bgcolor: { xs: 'transparent', lg: drawerBG } }}
                    border
                    content={false}
                >
                    <Box sx={{ p: 3, pb: 2 }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                                    <Grid item>
                                        <UserAvatar user={{ online_status: status, avatar: 'avatar-5.png', name: 'User 1' }} />
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <Typography variant="h4">Pedro</Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={handleClickRightMenu} size="large" aria-label="expandMore">
                                            <ExpandMoreIcon />
                                        </IconButton>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleCloseRightMenu}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleRightMenuItemClick('available')}>
                                                <AvatarStatus status="available" mr={1} />
                                                Available
                                            </MenuItem>
                                            <MenuItem onClick={handleRightMenuItemClick('do_not_disturb')}>
                                                <AvatarStatus status="do_not_disturb" mr={1} />
                                                Do not disturb
                                            </MenuItem>
                                            <MenuItem onClick={handleRightMenuItemClick('offline')}>
                                                <AvatarStatus status="offline" mr={1} />
                                                Offline
                                            </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <OutlinedInput
                                    fullWidth
                                    id="input-search-header"
                                    placeholder="Search Mail"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchTwoToneIcon fontSize="small" />
                                        </InputAdornment>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <PerfectScrollbar
                        style={{
                            overflowX: 'hidden',
                            height: downLG ? 'calc(100vh - 190px)' : 'calc(100vh - 445px)',
                            minHeight: downLG ? 0 : 520
                        }}
                    >
                        <Box sx={{ p: 3, pt: 0 }}>
                            <UserList setUser={setUser} />
                        </Box>
                    </PerfectScrollbar>
                </MainCard>
            )}
        </Drawer>
    );
};

export default ChatDrawer;
