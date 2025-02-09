// React imports
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// MUI component imports
import { Box, Typography, TextField, Button } from '@mui/material/'
// MUI icon imports
import PersonIcon from '@mui/icons-material/Person'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
// Internal style imports
import BoxStyle from '../styles/BoxStyle.jsx'
// Internal component imports
import ErrorAlert from '../components/ErrorAlert.jsx'
// Internal util imports
import { handleCreateButton } from '../utils/CreateUtil.jsx'
import { handleJoinButton } from '../utils/JoinUtil.jsx'

export default function HomePage() {

    // Navigate/location hooks
    const navigate = useNavigate()
    const location = useLocation()

    // Loading state
    const [loading, setLoading] = useState(false)

    // Player/room states
    const [name, setName] = useState('')
    const [code, setCode] = useState('')

    // Error alert states
    const [errorOpen, setErrorOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Handle player name-input (only letters, and maximum 12 characters)
    const handleNameInput = (event) => {
        const value = event.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 12)
        setName(value)
    }

    // Handle room code-input (only letters and uppercases, and maximum 4 characters)
    const handleCodeInput = (event) => {
        const value = event.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4)
        setCode(value)
    }

    // Check for error passed through navigation
    useEffect(() => {
        if (location.state && location.state.error) {
            setErrorMessage(location.state.error)
            setErrorOpen(true)
            // Clear error after set
            window.history.replaceState(null, '', window.location.pathname)
        }
    }, [location])

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
                        marginBottom: 2,
                    }}>
                    <strong>7 Wonders Scoreboard</strong>
                </Typography>

                {/* Player name-texts */}
                <Typography
                    variant='body1'>
                    <PersonIcon
                        sx={{
                            marginRight: 1,
                        }} />
                    <strong>Add a player name.</strong>
                </Typography>
                <Typography variant='caption'>
                    (3-12 letters)
                </Typography>
                <br />

                {/* Player name-input */}
                <TextField
                    required
                    id='name'
                    variant='outlined'
                    label='Name'
                    onChange={(event) => handleNameInput(event, setName)}
                    value={name}
                    sx={{
                        width: '16ch',
                        marginBottom: 2.5,
                    }} />

                {/* Create/join-text */}
                <Typography
                    variant='body1'
                    sx={{
                        maxWidth: '90%',
                        marginX: 'auto',
                    }}>
                    <PersonAddIcon
                        sx={{
                            marginRight: 1,
                        }} />
                    <strong>Create a new room or join an existing one.</strong>
                </Typography>

                {/* Button-content */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                    {/* Create-content */}
                    <Box
                        sx={{
                            width: 150,
                            height: 165,
                            marginRight: 3,
                            p: 2,
                            borderRadius: 2,
                            boxShadow: 3,
                        }}>

                        {/* Create-text */}
                        <Typography
                            variant='body2'
                            sx={{
                                maxWidth: '100%',
                                marginX: 'auto',
                                height: 60,
                            }}>
                            A four-letter room code is provided after the room is created.
                        </Typography>

                        {/* Create-button */}
                        <Button
                            variant='contained'
                            onClick={() => handleCreateButton(name, setLoading, navigate, showError)}
                            loading={loading}
                            sx={{
                                marginTop: 4.5,
                                backgroundColor: 'rgb(202, 178, 92)',
                                color: 'rgb(247, 247, 247)',
                            }}>
                            Create
                        </Button>
                    </Box>

                    {/* Join-content */}
                    <Box
                        sx={{
                            width: 150,
                            height: 165,
                            my: 2,
                            p: 2,
                            borderRadius: 2,
                            boxShadow: 3,
                        }}>

                        {/* Room code-input */}
                        <TextField
                            required
                            id='code'
                            variant='outlined'
                            label='CODE'
                            onChange={(event) => handleCodeInput(event, setCode)}
                            value={code}
                            sx={{
                                width: '10ch',
                            }} />
                        <br />

                        {/* Join-button */}
                        <Button
                            variant='contained'
                            onClick={() => handleJoinButton(name, code, setLoading, navigate, showError)}
                            loading={loading}
                            sx={{
                                backgroundColor: 'rgb(202, 178, 92)',
                                color: 'rgb(247, 247, 247)',
                                marginTop: 1,
                            }}>
                            Join
                        </Button>
                    </Box>
                </Box>

                {/* Scores-text */}
                <Typography
                    variant='caption'
                    sx={{
                        marginLeft: 6,
                    }}>
                    <strong>Continue adding the unfinished scores</strong>
                </Typography>

                {/* Scores-button */}
                <Button
                    onClick={() => navigate('/7-wonders-scoreboard/scores')}>
                    <KeyboardDoubleArrowRightIcon
                        sx={{
                            marginBottom: 0,
                            marginLeft: -3,
                        }} />
                </Button>
                <br />

                {/* Results-text */}
                <Typography
                    variant='caption'
                    sx={{
                        marginLeft: 6,
                    }}>
                    <strong>Return to the old results</strong>
                </Typography>

                {/* Results-button */}
                <Button
                    onClick={() => navigate('/7-wonders-scoreboard/results')}>
                    <KeyboardDoubleArrowRightIcon
                        sx={{
                            marginBottom: 0,
                            marginLeft: -3,
                        }} />
                </Button>
            </Box>

            {/* Error alert */}
            <ErrorAlert
                open={errorOpen}
                message={errorMessage}
                handleClose={handleCloseError} />
        </>
    )
}
