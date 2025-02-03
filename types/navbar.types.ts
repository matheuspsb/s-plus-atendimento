import { ChipProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { FunctionComponent, ReactNode } from "react";

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}

export type OverrideIcon =
    | (OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
          muiName: string;
      })
    | React.ComponentClass<any>
    | FunctionComponent<any>
    | any;

export type NavItemType = {
	id?: string;
	link?: string;
	icon?: GenericCardProps['iconPrimary'];
	target?: boolean;
	external?: boolean;
	url?: string | undefined;
	type?: string;
	title?: ReactNode | string;
	color?: 'primary' | 'secondary' | 'default' | undefined;
	caption?: ReactNode | string;
	breadcrumbs?: boolean;
	disabled?: boolean;
	chip?: ChipProps;
	children?: NavItemType[];
	elements?: NavItemType[];
	search?: string;
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';