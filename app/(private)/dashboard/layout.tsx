"use client"

import Header from "@/layout/header";
import Sidebar from "@/layout/sidebar/Sidebar";
import { menuService } from "@/services/menu/menu.service";
import { AppBar, Box, Container, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import MainContentStyled from "./MainContentStyled";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const { menuMaster } = menuService.useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  const isHorizontal = downMD;
  const borderRadius = 8;
  const menuOrientation = 'vertical';

useEffect(() => {
    downMD && menuService.handlerDrawerOpen(false);
}, [downMD]);

  const menu = <Sidebar />

  // if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: 'flex' }}>
          <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0} sx={{ bgcolor: 'background.default' }}>
              <Toolbar sx={{ p: isHorizontal ? 1.25 : 2 }}>
                  <Header />
              </Toolbar>
          </AppBar>

          {menu}

          <MainContentStyled {...{ borderRadius, menuOrientation, open: drawerOpen, theme }}>
              <Container maxWidth={false} {...({ sx: { px: { xs: 0 } } })}>
                  {children}
              </Container>
          </MainContentStyled>
          {/* <Customization /> */}
      </Box>
  );
}