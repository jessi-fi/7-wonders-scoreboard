// MUI component imports
import { AppBar, Box } from '@mui/material/'
// Internal image imports
import WondersImage1 from '../assets/images/wonders-light1.jpg'

export default function HeaderBar() {

    return (
        <>
            <Box
                sx={{
                    height: 120,
                    position: 'relative',
                }}>

                {/* Header background */}
                <AppBar
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: 120,
                        backgroundColor: 'white',
                        backgroundImage: `url(${WondersImage1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 1,
                    }} />
            </Box>
        </>
    )
}
