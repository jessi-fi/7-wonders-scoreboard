// Internal service imports
import { addRoom, deleteRoom } from '../services/RoomService.jsx'
import { addPlayer } from '../services/PlayerService.jsx'

// Validate player name (minimum 3 letters) -- called in handleCreateButton() and handleJoinButton()
export const validateName = (name) => {
    const trimmedName = name.trim()
    return trimmedName.length >= 3
}

export const handleCreateButton = async (name, setLoading, navigate, showError) => {
    setLoading(true)
    // Validate player name
    if (!validateName(name)) {
        showError('Add a name with at least three letters.')
        setLoading(false)
        return
    }
    let code
    try {
        // Add room
        code = await addRoom()
    }
    // Set error in case of failure
    catch (error) {
        showError('Creating a room failed, try again.')
        // Stop if adding room failed
        setLoading(false)
        return
    }
    try {
        // Add player
        await addPlayer(name, code)
    }
    // Set error in case of failure
    catch (error) {
        showError('Creating a room failed, try again.')
        // Delete latest room
        await deleteRoom()
        // Stop if adding player failed
        setLoading(false)
        return
    }
    // Navigate to scores if creating room succeeded
    setLoading(false)
    navigate('/7-wonders-scoreboard/scores')
}
