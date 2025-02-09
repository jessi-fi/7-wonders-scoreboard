// Internal service imports
import { addScores } from '../services/ScoreService.jsx'

export const handleSendButton = async (steps, scores, setLoading, navigate, showError) => {
    setLoading(true)
    // Map score categories
    const scoresMap = steps.reduce((acc, step, index) => {
        acc[step] = scores[index]
        return acc
    }, {})
    try {
        // Add scores
        await addScores(scoresMap)
    }
    // Set correct error in case of failure
    catch (error) {
        if (error.message.includes('Scores already exist')) {
            showError('The scores have already been sent, return to the home.')
        }
        else {
            showError('Sending the scores failed, try again.')
        }
        // Stop if adding scores failed
        setLoading(false)
        return
    }
    // Navigate to results if adding scores succeeded
    setLoading(false)
    navigate('/7-wonders-scoreboard/results')
}
