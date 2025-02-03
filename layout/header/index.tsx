import { menuService } from '@/services/menu/menu.service';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconMenu2 } from '@tabler/icons-react';

const Header = () => {
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    const { menuMaster } = menuService.useGetMenuMaster();
    const drawerOpen = menuMaster?.isDashboardDrawerOpened;
    const isHorizontal = downMD;

    return (
        <>
            {/* logo & toggler button */}
            <Box sx={{ width: downMD ? 'auto' : 228, display: 'flex' }}>
                {!isHorizontal && (
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            overflow: 'hidden',
                            transition: 'all .2s ease-in-out',
                            bgcolor: 'secondary.light',
                            color: 'secondary.dark',
                            '&:hover': {
                                bgcolor: 'secondary.dark',
                                color: 'secondary.light'
                            }
                        }}
                        onClick={() => menuService.handlerDrawerOpen(!drawerOpen)}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="20px" />
                    </Avatar>
                )}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />


            {/* mobile header */}
            {/* <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box> */}
        </>
    );
};

export default Header;
