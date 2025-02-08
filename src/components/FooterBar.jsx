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
                    height: 240,
                    position: 'relative',
                }}>

                {/* Footer background */}
                <AppBar
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: 240,
                        backgroundColor: 'white',
                        backgroundImage: `url(${WondersImage2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 1,
                    }} />

                {/* Button/info-content */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(46, 46, 46, 0.7)',
                        padding: 2,
                        borderRadius: 2,
                        textAlign: 'center',
                        width: 300,
                        zIndex: 2,
                    }}>

                    {/* Results-button */}
                    <Button
                        variant='contained'
                        onClick={() => navigate('/7-wonders-scoreboard/results')}
                        sx={{
                            marginTop: 1,
                            backgroundColor: 'rgb(219, 201, 102)',
                        }}>
                        Return to the results
                    </Button>
                    <br />

                    {/* Info-link */}
                    <Typography
                        variant='body2'
                        onClick={handleOpenDialog}
                        sx={{
                            marginTop: 3,
                            color: 'rgb(202, 178, 92)',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}>
                        App Info
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
