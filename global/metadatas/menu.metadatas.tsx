import { menuRoutes } from '@/config/routes';
import { NavItemType } from '@/types/navbar.types';
import { IconDashboard } from '@tabler/icons-react';

const icons = {
  IconDashboard: IconDashboard,
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
	],
};

const menuMetadata: { items: NavItemType[] } = {
	items: [menu],
};

export default menuMetadata;