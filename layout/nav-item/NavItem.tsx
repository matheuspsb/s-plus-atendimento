import NextLink from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { menuService } from '@/services/menu/menu.service';
import { LinkTarget, NavItemType } from '@/types/navbar.types';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { usePathname } from 'next/navigation';


interface NavItemProps {
	item: NavItemType;
	level: number;
	isParents?: boolean;
	setSelectedID?: () => void;
}

export default function NavItem({
	item,
	level,
	isParents = false,
	setSelectedID,
}: NavItemProps) {
	const theme = useTheme();
	const downMD = useMediaQuery(theme.breakpoints.down('md'));
	const ref = useRef<HTMLSpanElement>(null);

	const pathname = usePathname();

	const { menuMaster } = menuService.useGetMenuMaster();
	const drawerOpen = menuMaster?.isDashboardDrawerOpened;
	const isHorizontal = downMD;
	const isSelected = item?.link ? pathname.startsWith(item.link) : pathname.startsWith(item.url!);

	const [hoverStatus, setHover] = useState<boolean>(false);

	const compareSize = () => {
		const compare =
			ref.current && ref.current.scrollWidth > ref.current.clientWidth;
		setHover(compare as boolean);
	};

	useEffect(() => {
		compareSize();
		window.addEventListener('resize', compareSize);
		window.removeEventListener('resize', compareSize);
	}, []);

	const Icon = item?.icon;
	const itemIcon = item?.icon ? (
    <Icon
        stroke={1.5}
        size={drawerOpen ? '20px' : '24px'}
        style={{ ...(isHorizontal && isParents && { fontSize: 20, stroke: '1.5' }) }}
    />
		) : (
			<FiberManualRecordIcon
				sx={{ width: isSelected ? 8 : 6, height: isSelected ? 8 : 6 }}
				fontSize={level > 0 ? 'inherit' : 'medium'}
			/>
		);

	let itemTarget: LinkTarget = '_self';
	if (item.target) {
		itemTarget = '_blank';
	}

	const itemHandler = () => {
		if (downMD) menuService.handlerDrawerOpen(false);

		if (isParents && setSelectedID) {
			setSelectedID();
		}
	};

	const iconSelectedColor = drawerOpen ? 'text.primary' : 'secondary.main';

	return (
		<>
			{!isHorizontal ? (
				<ListItemButton
					component={NextLink}
          href={item.url!}
					target={itemTarget}
					disabled={item.disabled}
					disableRipple={!drawerOpen}
					sx={{
						zIndex: 1201,
						borderRadius: `8px`,
						mb: 0.5,
						pl: drawerOpen ? `12px` : '12px',
						...(drawerOpen &&
							level === 1 &&
							{
								'&:hover': {
									bgcolor: 'secondary.light',
								},
								'&.Mui-selected': {
									bgcolor: 'secondary.light',
									color: iconSelectedColor,
									'&:hover': {
										color: iconSelectedColor,
										bgcolor: 'secondary.light',
									},
								},
							}),
						...((!drawerOpen || level !== 1) && {
							py: level === 1 ? 0 : 1,
							'&:hover': {
								bgcolor: 'transparent',
							},
							'&.Mui-selected': {
								'&:hover': {
									bgcolor: 'transparent',
								},
								bgcolor: 'transparent',
							},
						}),
					}}
					selected={isSelected}
					onClick={() => itemHandler()}>
					<ButtonBase
						aria-label="theme-icon"
						sx={{ borderRadius: `8px` }}
						disableRipple={drawerOpen}>
						<ListItemIcon
							sx={{
								minWidth: level === 1 ? 36 : 18,
								color: isSelected ? iconSelectedColor : '#6B7280',
								...(!drawerOpen &&
									level === 1 && {
										borderRadius: `8px`,
										width: 46,
										height: 46,
										alignItems: 'center',
										justifyContent: 'center',
										'&:hover': {
											bgcolor: 'secondary.light',
										},
										...(isSelected && {
											bgcolor: 'secondary.light',
											'&:hover': {
												bgcolor:
													'secondary.light',
											},
										}),
									}),
							}}>
							{itemIcon}
						</ListItemIcon>
					</ButtonBase>

					{(drawerOpen || (!drawerOpen && level !== 1)) && (
						<Tooltip title={item.title} disableHoverListener={!hoverStatus}>
							<ListItemText
								primary={
									<Typography
										ref={ref}
										noWrap
										overflow="hidden"
										textOverflow="ellipsis"
										variant={isSelected ? 'h5' : 'body1'}
										color={`${isSelected ? '#00437D' : 'text.primary'}`}
										width={144}>
										{item.title}
									</Typography>
								}
								secondary={
									item.caption && (
										<Typography
											variant="caption"
											sx={{ ...theme.typography.subMenuCaption }}
											display="block"
											gutterBottom>
											{item.caption}
										</Typography>
									)
								}
							/>
						</Tooltip>
					)}

					{drawerOpen && item.chip && (
						<Chip
							color={item.chip.color}
							variant={item.chip.variant}
							size={item.chip.size}
							label={item.chip.label}
							avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
						/>
					)}
				</ListItemButton>
			) : (
				<ListItemButton
          component={NextLink}
          href={item.url!}
					target={itemTarget}
					disabled={item.disabled}
					sx={{
						borderRadius: isParents ? `8px` : 0,
						mb: isParents ? 0 : 0.5,
						alignItems: 'flex-start',
						backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
						py: 1,
						pl: 2,
						mr: isParents ? 1 : 0,
					}}
					selected={isSelected}
					onClick={() => itemHandler()}>
					<ListItemIcon
						sx={{
							my: 'auto',
							minWidth: !item?.icon ? 18 : 36,
						}}>
						{itemIcon}
					</ListItemIcon>

					<ListItemText
						primary={
							<Typography variant={isSelected ? 'h5' : 'body1'} color="inherit">
								{item.title}
							</Typography>
						}
						secondary={
							item.caption && (
								<Typography
									variant="caption"
									sx={{ ...theme.typography.subMenuCaption }}
									display="block"
									gutterBottom>
									{item.caption}
								</Typography>
							)
						}
					/>

					{item.chip && (
						<Chip
							color={item.chip.color}
							variant={item.chip.variant}
							size={item.chip.size}
							label={item.chip.label}
							avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
						/>
					)}
				</ListItemButton>
			)}
		</>
	);
}
