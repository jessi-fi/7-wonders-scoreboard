// React imports
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// MUI component imports
import { Box, Typography } from '@mui/material/'
// Internal style imports
import BoxStyle from '../styles/BoxStyle.jsx'
// Internal component imports
import ScoreTable from '../components/ScoreTable.jsx'
// Internal service imports
import { fetchScores } from '../services/ScoreService.jsx'
import { fetchCode } from '../services/RoomService.jsx'

export default function ResultsPage() {

    // Navigate hook
    const navigate = useNavigate()

    // Loading state
    const [loading, setLoading] = useState(true)

    // Room state
    const [room, setRoom] = useState('')

    // Scores state
    const [scores, setScores] = useState([])

    // Get latest room code from local storage
    useEffect(() => {
        const loadRoom = async () => {
            const storedRoom = localStorage.getItem('lastRoom')
            // Navigate to home page if user does not have room
            if (!storedRoom) {
                console.error('User does not have room')
                navigate('/7-wonders-scoreboard/', { state: { error: 'A room is required.' } })
                return
            }
            setRoom(storedRoom)
            try {
                // Check if room exist
                const roomExists = await fetchCode(storedRoom)
                // Navigate to home page if room does not exist
                if (!roomExists) {
                    console.error('Room does not exist')
                    navigate('/7-wonders-scoreboard/', { state: { error: 'A room is required.' } })
                    return
                }
                // Fetch scores
                const scores = await fetchScores(storedRoom)
                setScores(scores)
            }
            // Set error in case of failure
            catch (error) {
                console.error('Fetching the scores failed:', error)
            }
            finally {
                setLoading(false)
            }
        }
        loadRoom()
    }, [])

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

                {/* Room code-text */}
                <Typography variant='caption'>
                    Room Code
                </Typography>
                <Typography variant='h6'>
                    <strong>{room}</strong>
                </Typography>

                {/* Scoreboard */}
                <ScoreTable
                    rows={scores}
                    loading={loading} />
            </Box>
        </>
    )
}
