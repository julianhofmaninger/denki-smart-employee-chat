import { BuildingOfficeIcon, ClockIcon, Cog6ToothIcon, InboxIcon, MapPinIcon, UserCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { getConfig } from '../../../../config/config';
import { MenuItemProps } from '../../../../data/default-models/menu-item';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';

let navItems: MenuItemProps[] = [];
if (getConfig().environment === "development") {
    navItems = [
        {
            isDivider: true
        },
        {
            text: 'Chats',
            icon: <BuildingOfficeIcon />,
            isPrimary: false,
            hide: true,
            pathname: "/home"
        },
        {
            text: 'Markierte Chats',
            hide: false,
            icon: <InboxIcon />,
            pathname: "/flagged-chats",
            allowedGroups: ["HR"]
        },
        {
            text: 'Logout',
            hide: false,
            icon: <ArrowLeftStartOnRectangleIcon />,
            pathname: "/logout",
        },
    ]
}
else {
    navItems = [
        {
            isDivider: true
        },
        {
            text: 'Chats',
            icon: <BuildingOfficeIcon />,
            isPrimary: false,
            hide: true,
            pathname: "/home"
        },
        {
            text: 'Markierte Chats',
            hide: false,
            icon: <InboxIcon />,
            pathname: "/flagged-chats",
            allowedGroups: ["HR"]
        },
        {
            text: 'Logout',
            hide: false,
            icon: <ArrowLeftStartOnRectangleIcon />,
            pathname: "/logout",
        },
    ]
}
export const  items = navItems;