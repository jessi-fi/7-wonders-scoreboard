// Internal service imports
import { joinRoom } from '../services/RoomService.jsx'
import { addPlayer } from '../services/PlayerService.jsx'
// Internal util imports
import { validateName } from '../utils/CreateUtil.jsx'

// Validate room code (minimum 4 letters) -- called in handleJoinButton()
const validateCode = (code) => {
    const trimmedCode = code.trim()
    return trimmedCode.length >= 4
}

export const handleJoinButton = async (name, code, setLoading, navigate, showError) => {
    setLoading(true)
    // Validate player name
    if (!validateName(name)) {
        showError('Add a name with at least three letters.')
        setLoading(false)
        return
    }
    // Validate room code
    if (!validateCode(code)) {
        showError('Add a code with four letters.')
        setLoading(false)
        return
    }
    try {
        // Join room
        await joinRoom(code)
    }
    // Set correct error in case of failure
    catch (error) {
        if (error.message.includes('Room does not exist')) {
            showError('The room does not exist, try again.')
        }
        else {
            showError('Joining the room failed, try again.')
        }
        // Stop if joining room failed
        setLoading(false)
        return
    }
    try {
        // Add player
        await addPlayer(name, code)
    }
    // Set correct error in case of failure
    catch (error) {
        if (error.message.includes('Player name already exist')) {
            showError('The name is already taken, try another.')
        }
        else {
            showError('Joining the room failed, try again.')
        }
        // Stop if adding player failed
        setLoading(false)
        return
    }
    // Navigate to scores if joining room succeeded
    setLoading(false)
    navigate('/7-wonders-scoreboard/scores')
}
