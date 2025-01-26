import { colors } from "./colors";

export const globalStyles = {
	colors: colors,
	styles: {
		global: () => ({
			body: {
				overflowX: 'hidden',
				bg: 'background',
				letterSpacing: '-0.3px'
			},
			input: {
				color: 'background'
			},
		})
	}
};
