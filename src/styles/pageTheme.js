import { createTheme } from "@mui/material";
const theme = createTheme({
	palette: {
		primary: {
			main: "#54DE7E",
		},
	},
	components: {
		MuiGrid: {
			styleOverrides: {
				root: {
					paddingLeft: "10px",
				},
				container: {
					paddingRight: "10px"
				}
			}
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontSize: 12,
					fontWeight: 'bold',
					color: '#979797',
					marginBottom: 2
				},
			}
		},
		MuiIconButton: {
			styleOverrides: {
				edgeEnd: {
					marginRight: "auto",
				},
			}
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					display: "flex",
					alignItems: "center"
				},
			}
		}
	},
	typography: {
		body2: {
			lineHeight: "15px !important"
		},
		headTitle: {
			fontWeight: "bold",
			textTransform: "capitalize",
			fontSize: "1.5rem",
			lineHeight: "2rem !important",
		},
		subTitle: {
			fontWeight: "bold",
			fontSize: "1rem",
			color: '#979797',
			lineHeight: "1.5rem !important",
		},
		contentBold: {
			fontWeight: "bold",
			textAlign: "center",
			fontSize: "0.8rem",
			lineHeight: "1rem !important",
			textTransform: "capitalize",
		},
		ensureType: {
			fontWeight: "bold",
			fontSize: "1rem",
		},
		claimNotHaveData: {
			fontSize: '1.25rem'
		}
	},
});
export default theme;