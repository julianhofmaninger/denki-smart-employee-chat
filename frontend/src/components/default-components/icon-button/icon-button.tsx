import { Spinner } from '@chakra-ui/react';
import { Border, BoxShadow, Color, FontSize, FontWeight, Height, Margin, Padding, Width } from "css-enums";
import React from 'react';
import { colors } from '../../../theme/colors';
import './icon-button.scss';

export interface IconButtonProps {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    text?: string;
    onClick?: (event: React.MouseEvent) => void;
    isLoading?: boolean;
    width?: Width | string;
    margin?: Margin | string;
    hoverIcon?: React.ReactNode;
    background?: string | Color;
    hoverBackground?: string | Color;
    color?: string | Color;
    outline?: string | Border;
    isDisabled?: boolean;
    boxShadow?: BoxShadow | string;
    fontSize?: FontSize | string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    padding?: string | Padding;
    fontWeight?: string | FontWeight;
    height?: string | Height;
}

export function IconButton({ height, fontWeight, padding="5px 12px 5px 12px", onMouseLeave, onMouseEnter, fontSize, boxShadow, isDisabled, hoverIcon, margin, startIcon, endIcon, text, onClick, isLoading, width, color, outline, background = colors.primary, hoverBackground = colors.primaryHover }: IconButtonProps) {
    const loadingButtonRef = React.createRef<HTMLDivElement>();
    const hoverIconRef = React.createRef<HTMLDivElement>();
    const [hover, setHover] = React.useState<boolean>(false);
    function toggleHover() {
        setHover((hov) => hov === false);
    }
    React.useEffect(() => {
        if (loadingButtonRef && loadingButtonRef.current) {
            if (isLoading === true) {
                loadingButtonRef.current.classList.add("isLoading");
                hoverIconRef?.current?.classList.add("isLoading");
            }
            else {
                loadingButtonRef.current.classList.remove("isLoading");
                hoverIconRef?.current?.classList.remove("isLoading");
            }
        }
    }, [isLoading])
    return (
        <div className='icon-button' style={{
            height,
            opacity: isLoading === true || isDisabled === true ? 0.5 : 1,
            width,
            margin,
            background: hover === true ? hoverBackground : background,
            outline,
            cursor: isDisabled === true ? "not-allowed" : "pointer",
            boxShadow: boxShadow !== undefined ? boxShadow : colors.boxShadow,
            fontSize,
            padding
        }}
            onMouseEnter={() => {
                toggleHover();
                onMouseEnter && onMouseEnter();
            }}
            onMouseLeave={() => {
                toggleHover();
                onMouseLeave && onMouseLeave();
            }}
            onClick={(e: React.MouseEvent) => { isDisabled !== true && onClick !== undefined && onClick(e); }}>
            <div style={{flexShrink: 0}}>
                {startIcon}
            </div>
            <span style={{ fontWeight: fontWeight, marginLeft: startIcon ? "8px" : undefined, marginRight: endIcon ? "8px" : undefined, color: color }}>{text}</span>
            {endIcon}
            {hoverIcon && <div ref={hoverIconRef} className='hover-icon'>
                <div style={{flexShrink: 0}}>
                    {hoverIcon}
                </div>
            </div>
            }
            <div ref={loadingButtonRef} className='loading-icon'>
                <Spinner height={"14.5px"} width={"14.5px"} />
            </div>
        </div>
    );
}