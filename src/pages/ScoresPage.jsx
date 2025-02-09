// React imports
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// MUI component imports
import { Box, Typography, Button } from '@mui/material/'
// MUI icon imports
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
// Internal style imports
import BoxStyle from '../styles/BoxStyle.jsx'
// Internal component imports
import ScoreStepper from '../components/ScoreStepper.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'
// Internal service imports
import { fetchCode } from '../services/RoomService.jsx'

export default function ScoresPage() {

    // Navigate hook
    const navigate = useNavigate()

    // Room and player states
    const [room, setRoom] = useState('')
    const [player, setPlayer] = useState('')

    // Error alert states
    const [errorOpen, setErrorOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Get latest room code and player name from local storage
    useEffect(() => {
        const loadRoomAndPlayer = async () => {
            const storedRoom = localStorage.getItem('lastRoom')
            const storedPlayer = localStorage.getItem('lastPlayer')
            // Navigate to home page if user does not have room and player
            if (!storedRoom || !storedPlayer) {
                console.error('User does not have room and player')
                navigate('/7-wonders-scoreboard/', { state: { error: 'A room and a player are required.' } })
                return
            }
            setRoom(storedRoom)
            setPlayer(storedPlayer)
            try {
                // Check if room exist
                const roomExists = await fetchCode(storedRoom)
                // Navigate to home page if room does not exist
                if (!roomExists) {
                    console.error('Room does not exist')
                    navigate('/7-wonders-scoreboard/', { state: { error: 'A room is required.' } })
                    return
                }
            }
            // Set error in case of failure
            catch (error) {
                console.error('Fetching the room failed:', error)
            }
        }
        loadRoomAndPlayer()
    }, [])

    // Error alert functions
    const showError = (message) => {
        setErrorMessage(message)
        setErrorOpen(true)
    }
    const handleCloseError = () => {
        setErrorOpen(false)
    }

    return (
        <>
            <Box sx={BoxStyle}>

                {/* Title */}
                <Typography
                    variant="body1"
                    sx={{
                        color: 'rgb(202, 178, 92)',
                        marginBottom: 1,
                    }}>
                    <strong>7 Wonders Scoreboard</strong>
                </Typography>

                {/* Code/name-texts */}
                <Typography variant='caption'>
                    Room Code
                </Typography>
                <Typography variant='h6'>
                    <strong>{room}</strong>
                </Typography>
                <Typography variant='caption'>
                    Player: <strong>{player}</strong>
                </Typography>

                {/* Score stepper */}
                <ScoreStepper showError={showError} />

                {/* Scores/home-content */}
                <Box
                    sx={{
                        marginTop: 1,
                    }}>

                    {/* Scores-text */}
                    <Typography variant='caption'>
                        (one set of scores per player)
                    </Typography>
                    <br />

                    {/* Home-text */}
                    <Typography
                        variant='body2'
                        sx={{
                            marginRight: 6,
                            marginTop: 1,
                        }}>

                        {/* Home-button */}
                        <Button
                            onClick={() => navigate('/7-wonders-scoreboard/')}>
                            <KeyboardDoubleArrowLeftIcon
                                sx={{
                                    marginBottom: 0.3,
                                    marginRight: -3,
                                }} />
                        </Button>
                        Return to the <strong>home</strong>.
                    </Typography>
                </Box>
            </Box>

            {/* Error alert */}
            <ErrorAlert
                open={errorOpen}
                message={errorMessage}
                handleClose={handleCloseError} />
        </>
    )
}
