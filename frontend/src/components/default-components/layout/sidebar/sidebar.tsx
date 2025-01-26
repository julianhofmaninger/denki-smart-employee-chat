import { ArrowsPointingInIcon, ArrowsPointingOutIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../config/axios';
import { getConfig } from '../../../../config/config';
import { MenuItemProps } from '../../../../data/default-models/menu-item';
import { GetEmployeeDto } from '../../../../data/dtos/EmployeeDtos';
import ChatPreview from '../../../../features/chat/components/chat-preview';
import { colors } from '../../../../theme/colors';
import { useAuth } from '../../../../utils/context/AuthContext';
import useScreenSize from '../../../../utils/default-hooks/use-screen-size';
import { CardOverlay } from '../../card-overlay/card-overlay';
import { screenSizes } from '../screen-sizes/screen-sizes';
import './sidebar.scss';
import { items } from './items';
import { useNavigate } from 'react-router-dom';


const menuItemVariants = {
    initial: {
        opacity: 0
    },
    opened: {
        opacity: 1,
        transition: {
            duration: .3,
            ease: 'easeIn'
        }
    },
    closed: {
        opacity: 0,
        transition: {
            duration: .3,
            ease: [.1, 1, .57, 1]
        }
    }
}

const menuIconVariants = {
    opened: (i: number) => ({
        x: [0, i * 2.4, 0],
    }),
    closed: (i: number) => ({
        x: [0, -i * 2.4, 0],
    })
}
const containerVariants = {
    opened: { width: '256px', maxHeight: '100svh' },
    closed: { width: '65px', maxHeight: '100svh' },
    hidden: { maxHeight: '0px' }
}
// i === -1 => is centered Item
const MenuItem = ({ isOpened, i, item, screenSize }: {
    isOpened: boolean; i: number; item: MenuItemProps; screenSize: {
        width: number;
        height: number;
    }
}) => {
    if ((screenSize.width <= screenSizes.md) === true && item.isHeader === true) {
        return <></>;
    }
    if (item.isDivider === true || (item.isHeader && isOpened === false)) {
        return (
            <AnimatePresence>
                <motion.div
                    className="line"
                    key={i}
                    style={{
                        margin: item.isHeader === true ? "37px auto 5px auto" : "32px auto 0px auto"
                    }}
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1,
                        width: isOpened ? '80%' : '75%',
                        transition: { width: { duration: .6 }, opacity: { duration: 0.4, delay: 0.6 } },
                    }}
                />
            </AnimatePresence>
        );
    }
    return (
        <motion.div
            className="option-container"
            variants={i === -1 || screenSize.width <= screenSizes.md ? undefined : menuIconVariants}
            custom={i}
            initial={{ scale: 1, color: colors.darkgrey }}
            transition={{ color: { duration: 0.3 }, scale: { duration: 0.2 }, x: { duration: 0.8 }, maxHeight: { duration: 0.3 } }}
            whileHover={{
                scale: item.action !== undefined ? isOpened === true ? 1.01 : 1.07 : 1,
                color: item.action !== undefined ? colors.primaryHover : colors.darkgrey
            }}
            whileTap={{ scale: item.action !== undefined ? 0.96 : 1 }}
            onClick={() => item.action !== undefined && item.action(item.pathname)}
            key={i}
            style={{
                cursor: item.isHeader === true ? "default !important" : "pointer"
            }}
        >
            {item.isHeader !== true &&
                <CardOverlay
                    borderRadius={colors.borderRadius}
                    padding='5px'
                    width='fit-content'
                    height='fit-content'
                    outline={item.pathname === window.location.pathname ? `2px solid ${colors.primary}` : `2px solid transparent`}
                    outlineOffset='1px'
                    // boxShadow={colors.secoundaryBoxShadow}
                    transition='outline 0.1s'
                >
                    <div
                        className={item.isPrimary ? "icon-size-primary" : "icon-size"}>
                        <div style={{ height: "100%", width: "100%" }}>
                            {item.icon}
                        </div>
                    </div>
                </CardOverlay>
            }
            <motion.div
                className='option-text'
                initial="initial"
                animate={isOpened === true ? "opened" : "closed"}
                variants={menuItemVariants}
                style={{
                    fontWeight: item.isHeader === true ? "bold" : item.pathname === window.location.pathname ? "bolder" : "normal",
                    marginLeft: item.isHeader === true ? "40px" : "0px",
                    fontSize: colors.fontSizeBg,
                    whiteSpace: item.wrap === true ? "wrap" : "nowrap"

                }}
                exit="closed"
            >
                {item.text}
            </motion.div>
        </motion.div>
    );
}
export interface SideMenuProps {
    scrollContainerRef: React.RefObject<HTMLDivElement>;
}
export default function SideMenu({ scrollContainerRef }: SideMenuProps) {
    const auth = useAuth();
    const navigate = useNavigate();
    const screenSize = useScreenSize();
    const [isOpened, setIsOpened] = useState((screenSize.width <= screenSizes.md) === true ? false : true);
    const [showMenu, setShowMenu] = useState<boolean>(true);


    function handlePathChange(path: string) {
        navigate(path);
    }

    React.useEffect(() => {
        if ((screenSize.width <= screenSizes.md) === true) {
            setIsOpened(false);
        }
    }, [screenSize])
    const lastScrollTop = React.useRef(0);
    const handleScroll = () => {
        if (screenSize.width > screenSizes.md) return;
        if (!scrollContainerRef.current) return;
        const st = scrollContainerRef.current.scrollTop;
        if (st > lastScrollTop.current) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
        lastScrollTop.current = st < 0 ? 0 : st;
    };
    React.useEffect(() => {
        scrollContainerRef.current?.addEventListener("scroll", handleScroll);
        return () => {
            scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

    }
    const controls = useAnimation();

    let expandMenuItem = {
        isOpened: isOpened,
        i: -1,
        item: {
            icon:
                isOpened === true ?
                    <ArrowsPointingInIcon
                        style={{
                            transform: `scale(0.9)`
                        }} />
                    :
                    <ArrowsPointingOutIcon style={{
                        transform: `scale(0.9)`
                    }} />
            ,
            text: "Menü Zuklappen",
            action: () => setIsOpened((isOpened) => !isOpened),
        },
        screenSize: screenSize,
    }
    const searchBarRef = React.useRef<HTMLInputElement>(null);
    const [shownItems, setShownItems] = useState<MenuItemProps[]>(items);

    React.useEffect(() => {
        if(auth.token?.Role === null || auth.token?.Role === undefined || auth.token === undefined) setShownItems([]);
        setShownItems(items.filter((item) => item.allowedGroups?.includes(auth.token?.Role as string) || item.allowedGroups === undefined));
    }, [auth.token?.Role])

    const [chats, setChats] = useState<GetEmployeeDto[]>([]);
    const loadChats = async () => {
        let response = await axiosInstance.get(`${getConfig().api.url}/Employee/Chats`);
        let chats = await response.data as GetEmployeeDto[];
        setChats(chats);
    }
    useEffect(() => {
        loadChats();
    }, [])

    return (
        <div className="side-menu">
            <motion.div
                className="container"
                initial="opened"
                variants={containerVariants}
                animate={showMenu === true ? isOpened === true ? 'opened' : 'closed' : 'hidden'}
                transition={{
                    duration: .3,
                    staggerChildren: .015,
                    staggerDirection: isOpened ? 1 : -1
                }}
                onMouseOver={() => {
                    controls.start({ left: 'calc(100% - 4rem)' });
                }}
                onMouseOut={() => {
                    (!isOpened && controls.start({ left: 'calc(100% - 6.3rem)' }));
                }}
            >
                <div className="menu-container">
                    <div className="logo-container">
                        <div className="logo-icon">
                            <img key={"logo-icon"} alt='' src={'/sbooe.png'}></img>
                        </div>
                        <motion.div
                            variants={menuItemVariants}
                            initial="initial"
                            animate={isOpened === true ? "opened" : "closed"}
                        >
                            <div className="logo-text">{auth.token?.Employee.Firstname} {auth.token?.Employee.Lastname}</div>
                        </motion.div>
                    </div>
                    {screenSize.width > screenSizes.md &&
                        <MenuItem
                            {...expandMenuItem}
                        />
                    }
                    <motion.div
                        className="search-container"
                        id='search-container'
                        animate={{
                            background: isOpened ? colors.background : colors.background
                        }}
                        style={{
                            gridTemplateColumns: "70px",
                        }}
                        transition={{ background: { duration: .3, type: "tween" }, gridTemplateColumns: { duration: 0.2, type: "tween" } }}
                        onClick={() => {
                            let searchInput = searchBarRef.current;
                            if (searchInput) {
                                searchInput.focus();
                            }
                            setIsOpened(true);
                        }}
                    >
                        <CardOverlay
                            maxHeight={"35px"}
                            maxWidth={"35px"}
                            borderRadius={colors.borderRadius}
                            padding='5px'
                        >
                            <MagnifyingGlassIcon color={colors.grey} id='search-icon' height={"100%"} width={"100%"} />
                        </CardOverlay>
                        <AnimatePresence>
                            {isOpened && (
                                <motion.div
                                    variants={menuItemVariants}
                                    initial="initial"
                                    animate="opened"
                                    exit="closed"
                                >
                                    <motion.input
                                        id='search-input'
                                        ref={searchBarRef}
                                        placeholder="Suchen ..."
                                        style={{
                                            background: colors.lightgrey,
                                            width: "156px",
                                            padding: "3px 6px",
                                            borderRadius: colors.borderRadius
                                        }}
                                        transition={{ duration: 0.2, type: "tween", maxWidth: { duration: 0 } }}
                                        onChange={(e) => {
                                            handleSearch(e);
                                        }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <div className='mt-3 flex flex-col gap-3'>
                        {
                            chats.map((chat, i) => {
                                return (
                                    <ChatPreview key={i} message={chat.Firstname + " " + chat.Lastname} employee={chat}/>
                                )
                            })
                        }
                    </div>
                    {shownItems.map((item, i) => {
                        if (item.hide === true) {
                            return;
                        }
                        const newItem = item.pathname === undefined ? item : { ...item, action: handlePathChange };
                        return (
                            <MenuItem
                                screenSize={screenSize}
                                isOpened={isOpened}
                                item={newItem}
                                i={i + 1}
                                key={i}
                            />
                        )
                    })}
                </div>
            </motion.div>
        </div>
    )
}