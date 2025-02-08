// MUI component imports
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Button } from '@mui/material'
// MUI icon imports
import CloseIcon from '@mui/icons-material/Close'

export default function InfoDialog({ open, handleClose }) {

    return (
        <>
            <Dialog
                onClose={handleClose}
                open={open}>

                {/* Title */}
                <DialogTitle
                    sx={{
                        backgroundColor: 'rgb(46, 46, 46)',
                        color: 'rgb(202, 178, 92)',
                    }}>
                    <strong>App Info</strong>
                </DialogTitle>

                {/* Close-iconbutton */}
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 10,
                        top: 12,
                    }}>
                    <CloseIcon />
                </IconButton>

                {/* Dialog-content */}
                <DialogContent
                    dividers
                    sx={{
                        backgroundColor: 'rgb(46, 46, 46)',
                        color: 'rgb(247, 247, 247)',
                    }}>

                    {/* Info-title */}
                    <Typography
                        variant='body1'
                        sx={{
                            color: 'rgb(247, 247, 247)',
                            marginBottom: 1,
                        }}>
                        <strong>About app</strong>
                    </Typography>

                    {/* Info-text */}
                    <Typography
                        variant='body2'
                        sx={{
                            color: 'rgb(247, 247, 247)',
                        }}>
                        This app helps players calculate scores for a 7 Wonders board game match.
                        <br />
                        One player creates a room and receives a four-letter room code.
                        <br />
                        Other players join the room using this code.
                        <br />
                        Each player adds their own scores, leading to the final results.
                    </Typography>
                    <br />

                    {/* Data-title */}
                    <Typography
                        variant='body1'
                        sx={{
                            color: 'rgb(247, 247, 247)',
                            marginBottom: 1,
                        }}>
                        <strong>Data usage</strong>
                    </Typography>

                    {/* Data-text */}
                    <Typography
                        variant='body2'
                        sx={{
                            color: 'rgb(247, 247, 247)',
                        }}>
                        This app stores the user's most recent room code and player name locally on their device
                        —this is necessary for the app’s functionality.
                        <br />
                        Player names and scores are stored in our database.
                        <br />
                        We do not collect personal data, track users, or share data.
                    </Typography>
                </DialogContent>

                {/* Bottom bar */}
                <DialogActions
                    sx={{
                        backgroundColor: 'rgb(46, 46, 46)',
                    }}>

                    {/* Close-button */}
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: 'rgb(202, 178, 92)',
                        }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
