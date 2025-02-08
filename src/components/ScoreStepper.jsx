// React imports
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// MUI component imports
import { useTheme } from '@mui/material/styles'
import { Box, MobileStepper, Typography, TextField, Button } from '@mui/material/'
// MUI icon imports
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import CreateIcon from '@mui/icons-material/Create'
import DoneIcon from '@mui/icons-material/Done'
import DoneAllIcon from '@mui/icons-material/DoneAll'
// Internal image imports
import WonderImage from '../assets/images/scores/wonder.png'
import TreasuryImage from '../assets/images/scores/treasury.png'
import MilitaryImage from '../assets/images/scores/military.png'
import CivilianImage from '../assets/images/scores/civilian.png'
import CommercialImage from '../assets/images/scores/commercial.png'
import ScienceImage from '../assets/images/scores/science.png'
import GuildImage from '../assets/images/scores/guild.png'
import CityImage from '../assets/images/scores/city.png'
import LeaderImage from '../assets/images/scores/leader.png'
import NavalImage from '../assets/images/scores/naval.png'
import IslandImage from '../assets/images/scores/island.png'
// Internal util imports
import { handleSendButton } from '../utils/SendUtil.jsx'

// Score category steps
const steps = [
    'Wonder',
    'Treasury',
    'Military',
    'Civilian',
    'Commercial',
    'Science',
    'Guild',
    'City',
    'Leader',
    'Naval',
    'Island',
]

export default function ScoreStepper({ showError }) {

    // Navigate hook
    const navigate = useNavigate()

    // Theme hook
    const theme = useTheme()

    // Loading state
    const [loading, setLoading] = useState(false)

    // Step states
    const [activeStep, setActiveStep] = useState(0)
    const maxSteps = steps.length

    // Scores state
    const [scores, setScores] = useState(steps.map(() => ''))

    // Handle score-input (only numbers and negative numbers, and maximum 4 characters)
    const handleScoreInput = (index, value) => {
        if (/^-?\d*$/.test(value)) {
            const newScores = [...scores]
            newScores[index] = value.slice(0, 3)
            setScores(newScores)
        }
    }

    // Handle back-button 
    const handleBackButton = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    // Handle next-button 
    const handleNextButton = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: 5,
                    height: 170,
                }}>

                {/* Score category-text */}
                <Typography variant='body1'>
                    <CreateIcon />
                    <strong>Add the {steps[activeStep]} score.</strong>
                </Typography>

                {/* Score category-content */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 3,
                        gap: 2,
                    }}>

                    {/* Score category-image */}
                    <img
                        src={[
                            WonderImage,
                            TreasuryImage,
                            MilitaryImage,
                            CivilianImage,
                            CommercialImage,
                            ScienceImage,
                            GuildImage,
                            CityImage,
                            LeaderImage,
                            NavalImage,
                            IslandImage
                        ][activeStep]}
                        alt={steps[activeStep].toLowerCase()}
                        style={{
                            maxWidth: 88,
                            height: 'auto',
                            marginBottom: 20,
                        }} />

                    {/* Score-input */}
                    <TextField
                        id={`score-${activeStep}`}
                        variant='outlined'
                        label='Score'
                        value={scores[activeStep]}
                        onChange={(e) => handleScoreInput(activeStep, e.target.value)}
                        sx={{
                            width: '7ch',
                        }} />
                </Box>
                <br />

                {/* All steps expect last step-text */}
                {activeStep !== maxSteps - 1 && (
                    <Typography variant='body2'>
                        <DoneIcon />
                        Continue to the next score.
                    </Typography>
                )}

                {/* Last step-text */}
                {activeStep === maxSteps - 1 && (
                    <Typography variant='body2'>
                        <DoneAllIcon />
                        Send the scores and continue to the results.
                    </Typography>
                )}
            </Box>

            {/* Stepper */}
            <MobileStepper
                variant='dots'
                steps={steps.length}
                position='static'
                activeStep={activeStep}
                sx={{
                    mx: 5,
                    justifyContent: 'center',
                    '& .MuiMobileStepper-dot': {
                        marginTop: 2.75,
                        backgroundColor: 'rgb(221, 221, 221)',
                    },
                    '& .MuiMobileStepper-dotActive': {
                        backgroundColor: 'rgb(202, 178, 92)',
                    },
                }}

                // Send/next-buttons
                nextButton={
                    activeStep === maxSteps - 1 ? (
                        <Button
                            onClick={() => handleSendButton(steps, scores, setLoading, navigate, showError)}
                            loading={loading}
                            loadingPosition='end'
                            endIcon={<KeyboardDoubleArrowRightIcon
                                sx={{
                                    marginBottom: 0.3,
                                }} />}
                            sx={{
                                marginTop: 3,
                                mx: 2,
                            }}>
                            Send
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNextButton}
                            disabled={activeStep === maxSteps - 1}
                            sx={{
                                marginTop: 3,
                                mx: 2,
                            }}>
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeftIcon
                                    sx={{
                                        marginBottom: 0.3,
                                    }} />
                            ) : (
                                <KeyboardArrowRightIcon
                                    sx={{
                                        marginBottom: 0.3,
                                    }} />
                            )}
                        </Button>
                    )
                }

                // Back-button
                backButton={
                    <Button
                        onClick={handleBackButton}
                        disabled={activeStep === 0}
                        sx={{
                            marginTop: 3,
                            mx: 2,
                        }}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRightIcon
                                sx={{
                                    marginBottom: 0.3,
                                }} />
                        ) : (
                            <KeyboardArrowLeftIcon
                                sx={{
                                    marginBottom: 0.3,
                                }} />
                        )}
                        Back
                    </Button>
                } />
        </>
    )
}
