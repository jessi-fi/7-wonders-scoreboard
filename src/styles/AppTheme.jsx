// MUI component imports
import { createTheme } from '@mui/material/styles'

// Colors:
// Dark gray 'rgb(79, 79, 79)',
// Darker gray 'rgb(46, 46, 46)',
// Light gray 'rgb(221, 221, 221)',
// Lighter gray 'rgb(247, 247, 247)',
// Gold 'rgb(219, 201, 102)',
// Darker gold 'rgb(202, 178, 92)',

const AppTheme = createTheme({

    // Text
    typography: {
        allVariants: {
            color: 'rgb(79, 79, 79)',
        },
    },

    // Components
    components: {

        // Icon
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    marginBottom: -4,
                    color: 'rgb(202, 178, 92)',
                },
            },
        },

        // Input
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginTop: 5,
                    marginX: 1,
                    marginBottom: 25,
                    borderRadius: 4,
                    backgroundColor: 'rgb(247, 247, 247)',
                },
            },
        },

        // Input border
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(221, 221, 221)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(202, 178, 92)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(221, 221, 221)',
                    },
                },
            },
        },

        // Input label
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.8rem',
                    color: 'rgb(79, 79, 79)',
                },
                outlined: {
                    '&.Mui-focused': {
                        color: 'rgb(79, 79, 79)',
                    },
                },
            }
        },

        // Button
        MuiButton: {
            styleOverrides: {
                root: {
                    height: 30,
                    color: 'rgb(79, 79, 79)',
                },
            },
        },

        // Table cell
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: 'rgb(79, 79, 79)',
                    width: '33.33%',
                },
            },
        },

        // Circular progress
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    color: 'rgb(202, 178, 92)',
                },
            },
        },
    },
})

export default AppTheme
