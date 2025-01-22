
import { Display, Position, FlexDirection, Gap, Height, Width, BackgroundColor, Padding, Margin, MaxWidth, FlexGrow, MaxHeight, OverflowY, Transition, Outline, OutlineOffset, BoxShadow } from "css-enums";
import { colors } from "../../../theme/colors";
export interface CardOverlayProps {
    margin?: Margin | string;
    padding?: Padding | string;
    children?: React.ReactNode;
    backgroundColor?: BackgroundColor | string;
    width?: Width | string;
    height?: Height | string;
    borderRadius?: string;
    position?: Position;
    display?: Display;
    flexDirection?: FlexDirection;
    gap?: Gap,
    maxWidth?: MaxWidth | string;
    flexGrow?: number | string | FlexGrow;
    maxHeight?: string | MaxHeight;
    overflowY?: OverflowY;
    transition?: string | Transition;
    outline?: Outline | string;
    outlineOffset?: OutlineOffset | string;
    boxShadow?: BoxShadow | string;
    showBoxShadow?: boolean;
}
export function CardOverlay({ boxShadow, showBoxShadow = true, outlineOffset, outline, transition, overflowY, maxHeight, flexGrow, maxWidth, gap, flexDirection, display, position, borderRadius, children = <></>, margin, padding, backgroundColor = "white" as BackgroundColor, width, height }: CardOverlayProps) {
    return (
        <div style={{
            maxWidth,
            position,
            margin,
            padding,
            backgroundColor,
            width,
            height,
            borderRadius,
            boxShadow: showBoxShadow === false ? undefined : boxShadow !== undefined ? boxShadow : colors.boxShadow,
            display,
            flexDirection,
            gap,
            flexGrow,
            maxHeight,
            overflowY,
            transition,
            outlineOffset,
            outline,
        }}>
            {children}
        </div>
    );
}