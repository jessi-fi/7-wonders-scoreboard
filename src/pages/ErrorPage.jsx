// MUI component imports
import { Box, Typography } from '@mui/material/'
// Internal style imports
import BoxStyle from '../styles/BoxStyle.jsx'

export default function ErrorPage() {

    return (
        <>
            <Box sx={BoxStyle}>

                {/* Error-content */}
                <Typography variant='body1'>
                    <strong>Error, page not found.</strong>
                </Typography>
            </Box>
        </>
    )
}
