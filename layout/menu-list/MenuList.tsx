import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { memo, useLayoutEffect, useState } from 'react';


import { HORIZONTAL_MAX_ITEM } from '@/constants/constant';
import menuMetadata from '@/global/metadatas/menu.metadatas';
import { menuService } from '@/services/menu/menu.service';
import { NavItemType } from '@/types/navbar.types';
import NavGroup from '../nav-group/NavGroup';
import NavItem from '../nav-item/NavItem';

const MenuList = () => {
    const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const { menuMaster } = menuService.useGetMenuMaster();
    const drawerOpen = menuMaster?.isDashboardDrawerOpened;
    const isHorizontal = downMD;

    const [selectedID, setSelectedID] = useState<string | undefined>('');
    const [menuItems, setMenuItems] = useState<{ items: NavItemType[] }>({ items: [] });

    useLayoutEffect(() => {
      const filteredItems = menuMetadata.items.map(group => {
        if (group.id === 'ui-menu' && group.children) {
          const permittedChildren = group.children.filter(child => {
            switch (child.id) {
              case 'dashboard':
                return true;
              default:
                return true;
            }
          });
          return { ...group, children: permittedChildren };
        }
        return group;
      });
  
      setMenuItems({ items: filteredItems });
    }, []);

    // last menu-item to show in horizontal menu bar
    const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;

    let lastItemIndex = menuItems.items.length - 1;
    let remItems: NavItemType[] = [];
    let lastItemId: string;

    if (lastItem && lastItem < menuItems.items.length) {
        lastItemId = menuItems.items[lastItem - 1].id!;
        lastItemIndex = lastItem - 1;
        remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
            title: item.title,
            elements: item.children,
            icon: item.icon,
            ...(item.url && {
                url: item.url
            })
        }));
    }

    const navItems = menuItems.items.slice(0, lastItemIndex + 1).map((item, index) => {
        switch (item.type) {
            case 'group':
                if (item.url && item.id !== lastItemId) {
                    return (
                        <List key={item.id}>
                            <NavItem item={item} level={1} isParents setSelectedID={() => setSelectedID('')} />
                            {!isHorizontal && index !== 0 && <Divider sx={{ py: 0.5 }} />}
                        </List>
                    );
                }

                return (
                    <NavGroup
                        key={item.id}
                        setSelectedID={setSelectedID}
                        selectedID={selectedID}
                        item={item}
                        lastItem={lastItem!}
                        remItems={remItems}
                        lastItemId={lastItemId}
                    />
                );
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return !isHorizontal ? <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box> : <>{navItems}</>;
};

export default memo(MenuList);
