import { colors } from "../../../theme/colors";
import { Tooltip as ChakraTooltip, PlacementWithLogical } from "@chakra-ui/react";
export interface TooltipProps {
    label: string;
    children: React.ReactNode;
    id?: string;
    placement?: PlacementWithLogical;
}

function Tooltip({ id, label, placement, children }: TooltipProps) {
    return (
        <ChakraTooltip placement={placement} id={id} label={label} boxShadow={colors.boxShadow} borderRadius={colors.borderRadius}>
            {children}
        </ChakraTooltip>
    );
}
export default Tooltip;