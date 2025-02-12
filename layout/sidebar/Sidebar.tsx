import { memo, useMemo } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PerfectScrollbar from 'react-perfect-scrollbar';



import { drawerWidth } from '@/constants/constant';
import { menuService } from '@/services/menu/menu.service';
import { Typography } from '@mui/material';
import { IconLogout } from '@tabler/icons-react';
import LogoSection from '../logo-section';
import MenuList from '../menu-list/MenuList';
import MiniDrawerStyled from './MiniDrawerStyled';

const Sidebar = () => {
    const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const theme = useTheme();

    const { menuMaster } = menuService.useGetMenuMaster();
    const drawerOpen = menuMaster?.isDashboardDrawerOpened;

    const logo = useMemo(
        () => (
            <Box sx={{ display: 'flex', p: 2 }}>
                <LogoSection />
            </Box>
        ),
        []
    );

    const drawer = useMemo(() => {
        let drawerSX = { paddingLeft: '0px', paddingRight: '0px', marginTop: '20px' };
        if (drawerOpen) drawerSX = { paddingLeft: '16px', paddingRight: '16px', marginTop: '0px' };

        return (
            <>
                {downMD ? (
                    <Box sx={drawerSX}>
                        <MenuList />
                        <Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 0.5,
									mt: 1,
									cursor: 'pointer',
								}}
								onClick={() => {}}>
								<IconLogout
									stroke={1.5}
									size="20px"
									color={theme.palette.error.dark}
								/>
								<Typography
									variant="body2"
									color={theme.palette.error.dark}
									fontSize="12px"
									fontWeight="500">
                                    Logout
								</Typography>
							</Box>
                    </Box>
                ) : (
                    <PerfectScrollbar style={{ height: 'calc(100vh - 88px)', ...drawerSX }}>
                        <MenuList />
                    </PerfectScrollbar>
                )}
            </>
        );
    }, [downMD, drawerOpen]);

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: { xs: 'auto', md: drawerWidth } }} aria-label="mailbox folders">
            {downMD || (drawerOpen) ? (
                <Drawer
                    variant={downMD ? 'temporary' : 'persistent'}
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => menuService.handlerDrawerOpen(!drawerOpen)}
                    sx={{
                        '& .MuiDrawer-paper': {
                            mt: downMD ? 0 : 11,
                            zIndex: 1099,
                            width: drawerWidth,
                            bgcolor: 'background.default',
                            color: 'text.primary',
                            borderRight: 'none'
                        }
                    }}
                    ModalProps={{ keepMounted: true }}
                    color="inherit"
                >
                    {downMD && logo}
                    {drawer}
                </Drawer>
            ) : (
                <MiniDrawerStyled variant="permanent" open={drawerOpen}>
                    {logo}
                    {drawer}
                </MiniDrawerStyled>
            )}
        </Box>
    );
};

export default memo(Sidebar);
