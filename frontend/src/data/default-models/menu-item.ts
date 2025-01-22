import { Color } from "css-enums";

export interface MenuItemProps {
    icon?: React.ReactNode;
    text?: string;
    isDivider?: boolean;
    isPrimary?: boolean;
    action?: (input?:any) => any;
    color?: Color | string;
    pathname?:string;
    isHeader?: boolean;
    hide?: boolean;
    wrap?: boolean;
    hideNavbar?: boolean;
    hideSidebar?: boolean;
    hideInfo?: boolean;
    allowedGroups?: string[];
}