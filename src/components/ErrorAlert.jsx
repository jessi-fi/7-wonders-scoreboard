// MUI component imports
import { Alert, Snackbar } from '@mui/material'

export default function ErrorAlert({ open, message, handleClose }) {

    return (
        <>
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}>

                {/* Alert-content */}
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{
                        color: 'rgb(247, 247, 247)',
                        backgroundColor: 'rgb(46, 46, 46)',
                    }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}
