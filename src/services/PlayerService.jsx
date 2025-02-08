// Firebase imports
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore'
// Internal service imports
import { db } from '../Firebase.jsx'
import { authUser } from './AuthService.jsx'

// Fetch player name and check if it exist in given room in Firestore -- called in addPlayer()
const fetchName = async (name, code) => {
  try {
    const playerQuery = query(
      collection(db, 'rooms', code, 'players'),
      where('player_name', '==', name)
    )
    const querySnapshot = await getDocs(playerQuery)
    console.log('Checked if player name exist in given room:', name)
    return !querySnapshot.empty
  }
  // Log error in case of failure and throw it forward
  catch (error) {
    console.error('Checking if player name exist in given room failed:', error)
    throw error
  }
}

// Add player to Firestore.. -- called in handleCreateButton() and handleJoinButton()
export const addPlayer = async (name, code) => {
  try {
    // Get current user
    const user = authUser()
    // ..if player name does not exist
    const nameExists = await fetchName(name, code)
    // Throw error to log in case of player name already exist
    if (nameExists) {
      throw new Error('Player name already exist:', name)
    }
    // Add player
    const playerRef = doc(db, 'rooms', code, 'players', name)
    await setDoc(playerRef, {
      player_name: name,
      uid: user.uid,
      created_at: new Date(),
    })
    console.log('Added player:', name)
    // Add player name to local storage
    localStorage.setItem('lastPlayer', name)
  }
  // Log error in case of failure and throw it forward
  catch (error) {
    console.error('Adding player failed:', error)
    throw error
  }
}
