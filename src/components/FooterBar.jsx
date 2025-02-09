// React imports
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// MUI component imports
import { AppBar, Box, Typography, Button } from '@mui/material/'
// Internal image imports
import WondersImage2 from '../assets/images/wonders-light2.jpg'
// Internal component imports
import InfoDialog from '../components/InfoDialog.jsx'

export default function FooterBar() {

    // Navigate hook
    const navigate = useNavigate()

    // Dialog states
    const [dialogOpen, setDialogOpen] = useState(false)
    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)

    return (
        <>
            <Box
                sx={{
                    height: 120,
                    position: 'relative',
                    width: '100%',
                    marginTop: 'auto',
                }}>

                {/* Footer background */}
                <AppBar
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: 120,
                        backgroundColor: 'white',
                        backgroundImage: `url(${WondersImage2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 1,
                    }} />

                {/* Info-content */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        width: 300,
                        zIndex: 2,
                    }}>

                    {/* Home-button */}
                    <Button
                        variant='contained'
                        onClick={() => navigate('/7-wonders-scoreboard/')}
                        sx={{
                            backgroundColor: 'rgb(202, 178, 92)',
                            color: 'rgb(247, 247, 247)',
                            marginBottom: 1,
                            mx: 2,
                        }}>
                        Home
                    </Button>
                    <br />

                    {/* Info-link */}
                    <Typography
                        variant='caption'
                        onClick={handleOpenDialog}
                        sx={{
                            color: 'rgb(247, 247, 247)',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}>
                        <strong>App Info</strong>
                    </Typography>
                </Box>
            </Box>

            {/* Info-dialog */}
            <InfoDialog
                open={dialogOpen}
                handleClose={handleCloseDialog} />
        </>
    )
}
