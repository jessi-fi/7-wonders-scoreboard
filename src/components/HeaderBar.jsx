// React imports
import { useNavigate } from 'react-router-dom'
// MUI component imports
import { AppBar, Box, Typography, Button } from '@mui/material/'
// Internal image imports
import WondersImage1 from '../assets/images/wonders-light1.jpg'

export default function HeaderBar() {

    // Navigate hook
    const navigate = useNavigate()

    return (
        <>
            <Box
                sx={{
                    height: 240,
                    position: 'relative',
                }}>

                {/* Header background */}
                <AppBar
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: 240,
                        backgroundColor: 'white',
                        backgroundImage: `url(${WondersImage1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 1,
                    }} />

                {/* Title/button-content */}
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

                    {/* Title */}
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'rgb(202, 178, 92)',
                        }}>
                        7 Wonders Scoreboard
                    </Typography>

                    {/* Title-text */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgb(247, 247, 247)',
                            maxWidth: '100%',
                            marginX: 'auto',
                            marginTop: 1,
                            marginBottom: 3,
                        }}>
                        Find out who is the 7 Wonders champion.
                    </Typography>

                    {/* Home-button */}
                    <Button
                        variant='contained'
                        onClick={() => navigate('/7-wonders-scoreboard/')}
                        sx={{
                            marginBottom: 1,
                            backgroundColor: 'rgb(231, 217, 89)',
                        }}>
                        Home
                    </Button>
                </Box>
            </Box>
        </>
    )
}
