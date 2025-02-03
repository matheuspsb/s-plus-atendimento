import Transitions from '@/components/transitions';
import { menuService } from '@/services/menu/menu.service';
import { NavItemType } from '@/types/navbar.types';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  IconChevronDown,
  IconChevronRight,
  IconMinusVertical,
} from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import NavItem from '../nav-item/NavItem';

type VirtualElement = {
	getBoundingClientRect: () => DOMRectReadOnly | DOMRect;
	contextElement?: Element;
};

interface NavGroupProps {
	item: NavItemType;
	lastItem: number;
	remItems: NavItemType[];
	lastItemId: string;
	setSelectedID: React.Dispatch<React.SetStateAction<string | undefined>>;
	selectedID: string | undefined;
}

export default function NavGroup({
	item,
	lastItem,
	remItems,
	lastItemId,
	selectedID,
	setSelectedID,
}: NavGroupProps) {
	const theme = useTheme();
	const downMD = useMediaQuery(theme.breakpoints.down('md'));
	const { pathname } = useParams();
	const { menuMaster } = menuService.useGetMenuMaster();
	const drawerOpen = menuMaster?.isDashboardDrawerOpened;
	const isHorizontal = downMD;

	const [anchorEl, setAnchorEl] = useState<
		VirtualElement | (() => VirtualElement) | null | undefined
	>(null);
	const [currentItem, setCurrentItem] = useState(item);

	const openMini = Boolean(anchorEl);

	useEffect(() => {
		if (lastItem) {
			if (item.id === lastItemId) {
				const localItem: any = { ...item };
				const elements = remItems.map((ele: NavItemType) => ele.elements);
				localItem.children = elements.flat(1);
				setCurrentItem(localItem);
			} else {
				setCurrentItem(item);
			}
		}
	}, [item, lastItem, remItems, lastItemId]);

	const checkOpenForParent = (child: NavItemType[], id: string) => {
		child.forEach((ele: NavItemType) => {
			if (ele.children?.length) {
				checkOpenForParent(ele.children, currentItem.id!);
			}
			if (
        ele?.url &&
        pathname === (ele?.link ? ele.link : ele.url)
    ) {
        setSelectedID(id);
    }
		});
	};

	const checkSelectedOnload = (data: NavItemType) => {
		const childrens = data.children ? data.children : [];
		childrens.forEach((itemCheck: NavItemType) => {
			if (itemCheck?.children?.length) {
				checkOpenForParent(itemCheck.children, currentItem.id!);
			}
			if (
				itemCheck?.url &&
        pathname === (itemCheck?.link ? itemCheck.link : itemCheck.url)
			) {
				setSelectedID(currentItem.id!);
			}
		});

		if (
			data?.url &&
      pathname === (data?.link ? data.link : data.url)
		) {
			setSelectedID(currentItem.id!);
		}
	};

	useEffect(() => {
		checkSelectedOnload(currentItem);
		if (openMini) setAnchorEl(null);
	}, [pathname, currentItem]);

	const handleClick = (
		event:
			| React.MouseEvent<HTMLAnchorElement>
			| React.MouseEvent<HTMLDivElement, MouseEvent>
			| undefined,
	) => {
		if (!openMini) {
			setAnchorEl(event?.currentTarget);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const Icon = currentItem?.icon;
    const itemIcon = currentItem?.icon ? <Icon stroke={1.5} size="20px" /> : null;

	// menu list collapse & items
	const items = currentItem.children?.map(menu => {
		switch (menu?.type) {
			case 'item':
				return <NavItem key={menu.id} item={menu} level={1} />;
			default:
				return (
					<Typography key={menu?.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	const moreItems = remItems.map((itemRem: NavItemType, i) => (
		<Fragment key={i}>
			{itemRem.url ? (
				<NavItem item={itemRem} level={1} />
			) : (
				itemRem.title && (
					<Typography variant="caption" sx={{ pl: 2 }}>
						{itemRem.title} {itemRem.url}
					</Typography>
				)
			)}
			{itemRem?.elements?.map(menu => {
				switch (menu?.type) {
					case 'item':
						return <NavItem key={menu.id} item={menu} level={1} />;
					default:
						return (
							<Typography
								key={menu.id}
								variant="h6"
								color="error"
								align="center">
								Menu Items Error
							</Typography>
						);
				}
			})}
		</Fragment>
	));

	const popperId = openMini ? `group-pop-${item.id}` : undefined;
	const isSelected = selectedID === currentItem.id;

	return (
		<>
			{!isHorizontal ? (
				<>
					<List
						disablePadding={!drawerOpen}
						subheader={
							currentItem.title &&
							drawerOpen && (
								<Typography
									variant="caption"
									sx={{ ...theme.typography.menuCaption }}
									display="block"
									gutterBottom>
									{currentItem.title}
									{currentItem.caption && (
										<Typography
											variant="caption"
											sx={{ ...theme.typography.subMenuCaption }}
											display="block"
											gutterBottom>
											{currentItem.caption}
										</Typography>
									)}
								</Typography>
							)
						}>
						{items}
					</List>

					{/* group divider */}
					{/* {drawerOpen && <Divider sx={{ mt: 0.25, mb: 1.25 }} />} */}
				</>
			) : (
				<List>
					<ListItemButton
						selected={isSelected}
						sx={{
							borderRadius: `8px`,
							p: 1,
							my: 0.5,
							mr: 1,
							display: 'flex',
							alignItems: 'center',
							backgroundColor: 'inherit',
						}}
						onMouseEnter={handleClick}
						onClick={handleClick}
						onMouseLeave={handleClose}
						aria-describedby={popperId}>
						{itemIcon && (
							<ListItemIcon sx={{ minWidth: 36, color: '#697586' }}>
								{currentItem.id === lastItemId ? (
									<IconMinusVertical stroke={1.5} size="20px" />
								) : (
									itemIcon
								)}
							</ListItemIcon>
						)}
						<ListItemText
							sx={{ mr: 1 }}
							primary={
								<Typography
									variant={isSelected ? 'h5' : 'body1'}
									color="inherit">
									{currentItem.id === lastItemId
										? 'moreItems'
										: currentItem.title}
								</Typography>
							}
						/>
						{openMini ? (
							<IconChevronDown stroke={1.5} size="16px" />
						) : (
							<IconChevronRight stroke={1.5} size="16px" />
						)}

						{anchorEl && (
							<Popper
								id={popperId}
								open={openMini}
								anchorEl={anchorEl}
								placement="bottom-start"
								sx={{
									overflow: 'visible',
									zIndex: 2001,
									minWidth: 180,
									'&:before': {
										content: '""',
										display: 'block',
										position: 'absolute',
										top: 5,
										left: 32,
										width: 12,
										height: 12,
										transform: 'translateY(-50%) rotate(45deg)',
										zIndex: 120,
										borderWidth: '6px',
										borderStyle: 'solid',
										borderTopColor: 'background.paper',
										borderLeftColor: 'background.paper',
										borderRightColor: 'transparent',
										borderBottomColor: 'transparent',
									},
								}}>
								{({ TransitionProps }) => (
									<Transitions in={openMini} {...TransitionProps}>
										<Paper
											sx={{
												mt: 0.5,
												py: 1.25,
												boxShadow: theme.shadows[8],
												backgroundImage: 'none',
											}}>
											<ClickAwayListener onClickAway={handleClose}>
												<Box
													sx={{
														minWidth: 200,
														maxHeight: 'calc(100vh - 170px)',
														overflowY: 'auto',
														'&::-webkit-scrollbar': {
															opacity: 0,
															width: 4,
															'&:hover': {
																opacity: 0.7,
															},
														},
														'&::-webkit-scrollbar-track': {
															bgcolor: 'transparent',
														},
														'&::-webkit-scrollbar-thumb': {
															bgcolor: 'divider',
															borderRadius: 4,
														},
													}}>
													{currentItem.id !== lastItemId ? items : moreItems}
												</Box>
											</ClickAwayListener>
										</Paper>
									</Transitions>
								)}
							</Popper>
						)}
					</ListItemButton>
				</List>
			)}
		</>
	);
}
