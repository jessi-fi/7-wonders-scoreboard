// Firebase imports
import { setDoc, doc, collection, getDocs } from 'firebase/firestore'
// Internal service imports
import { db } from '../Firebase.jsx'
import { authUser } from './AuthService.jsx'

// Add scores for player in Firestore -- called in handleSendButton()
export const addScores = async (scoresMap) => {
    try {
        // Get current user
        const user = authUser()
        // Get user's last room code and player name from local storage
        const code = localStorage.getItem('lastRoom')
        const name = localStorage.getItem('lastPlayer')
        // Check if player's scores already exist
        const scoresRef = collection(db, 'rooms', code, 'players', name, 'scores')
        const scoresSnapshot = await getDocs(scoresRef)
        if (!scoresSnapshot.empty) {
            // Throw error to log in case of scores already exist
            throw new Error('Scores already exist')
        }
        // Add scores to correct categories
        for (const [category, score] of Object.entries(scoresMap)) {
            const scoreDocRef = doc(scoresRef, category)
            await setDoc(scoreDocRef, {
                score_category: category,
                score: Number(score),
            })
            console.log('Added score:', category, Number(score))
        }
        console.log('Added scores for player:', name)
    }
    // Log error in case of failure and throw it forward
    catch (error) {
        console.error('Adding scores for player failed:', error)
        throw error
    }
}

// Fetch all scores from room in Firestore -- called in ResultsPage()
export const fetchScores = async (code) => {
    try {
        // Fetch room's players
        const playersRef = collection(db, 'rooms', code, 'players')
        const playersSnapshot = await getDocs(playersRef)
        // Add every player's scores to data array
        const scoresData = []
        // Loop through each player
        for (const playerDoc of playersSnapshot.docs) {
            const name = playerDoc.id
            const scoresRef = collection(db, 'rooms', code, 'players', name, 'scores')
            const scoresSnapshot = await getDocs(scoresRef)
            let finalScore = 0
            const playerScores = { player: name }
            // Store player's scores
            scoresSnapshot.forEach((scoreDoc) => {
                const { score_category, score } = scoreDoc.data()
                playerScores[score_category] = score
                finalScore += score
            })
            playerScores.finalScores = finalScore
            // Add player's scores to data array
            scoresData.push(playerScores)
        }
        // Sort every player's final scores in descending order
        scoresData.sort((a, b) => b.finalScores - a.finalScores)
        // Return sorted scores
        console.log('Fetched all scores from room:', code)
        return scoresData
    }
    // Log error in case of failure and throw it forward
    catch (error) {
        console.error('Fetching all scores from room failed:', error)
        throw error
    }
}
