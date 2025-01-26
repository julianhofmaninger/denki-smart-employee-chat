import React from "react";
import { useLocation } from "react-router-dom";
import { MenuItemProps } from "../../../data/default-models/menu-item";
import "./layout.scss";
import { items } from "./sidebar/items";
import SideMenu, { SideMenuProps } from "./sidebar/sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);


    const location = useLocation();
    const [showLayout, setShowLayout] = React.useState<boolean>(false);
    const [showSidebar, setShowSidebar] = React.useState<boolean>(true);
    React.useEffect(() => {
        const currentItem = items.find((item: MenuItemProps) => { return item.pathname?.toLowerCase() === location.pathname?.toLowerCase() });
        if (currentItem === undefined) {
            setShowLayout(false);
        }
        else {
            setShowLayout(true);

            if (currentItem.hideSidebar === true) {
                setShowSidebar(false);
            }
            else {
                setShowSidebar(true);
            }

        }

    }, [location.pathname]);
    let sideMenuProps: SideMenuProps = {
        scrollContainerRef: scrollContainerRef
    };
    return (
        <div className="layout-container" >
            {showLayout === true ?
                <>
                    {showSidebar &&
                        <div className="sidebar-area">
                            <SideMenu {...sideMenuProps} />
                        </div>
                    }
                    <div
                        id="layout-scroll-container"
                        ref={scrollContainerRef}
                        className="layout-scroll-container">
                        <div className="main-area">
                            {children}
                        </div>
                    </div>
                </>
                :
                <>
                    {children}
                </>
            }
        </div>
    );
}