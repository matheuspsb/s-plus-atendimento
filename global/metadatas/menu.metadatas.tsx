import { menuRoutes } from '@/config/routes';
import { NavItemType } from '@/types/navbar.types';
import { IconDashboard, IconMessageCircle } from '@tabler/icons-react';

const icons = {
  IconDashboard: IconDashboard,
  IconService: IconMessageCircle 
};

const menu: NavItemType = {
	id: 'ui-menu',
	type: 'group',
	children: [
		{
			id: 'dashboard',
			title: 'Dashboard',
			type: 'item',
			icon: icons.IconDashboard,
			url: menuRoutes.DASHBOARD,
			breadcrumbs: false,
		},
    {
      id: 'service',
      title: 'Atendimento',
      type: 'item',
      icon: icons.IconService,
      url: menuRoutes.SERVICE,
      breadcrumbs: false,
    }
	],
};

const menuMetadata: { items: NavItemType[] } = {
	items: [menu],
};

export default menuMetadata;