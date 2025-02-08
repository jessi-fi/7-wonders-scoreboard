// Firebase imports
import { collection, getDocs, query, where, setDoc, doc, deleteDoc, orderBy, limit } from 'firebase/firestore'
// Internal service imports
import { db } from '../Firebase.jsx'
import { authUser } from './AuthService.jsx'

// Create random 4 letter upper case room code -- called in addRoom()
const createCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let code = ''
    for (let i = 0; i < 4; i++) {
        code += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    return code
}

// Fetch last room user added from Firestore -- called in deleteRoom()
const fetchRoom = async () => {
    try {
        // Get current user
        const user = authUser()
        // Fetch latest room
        const roomQuery = query(
            collection(db, 'rooms'),
            where('created_by', '==', user.uid),
            orderBy('created_at', 'desc'),
            limit(1)
        )
        const querySnapshot = await getDocs(roomQuery)
        const lastRoom = querySnapshot.docs[0].data()
        console.log('Fetched last room user added:', lastRoom.room_code)
        return querySnapshot
    }
    // Log error in case of failure and throw it forward
    catch (error) {
        console.error('Fetching last room user added failed:', error)
        throw error
    }
}

// Fetch room code and check if it exist in Firestore -- called in addRoom(), joinRoom(), ScoresPage() and ResultsPage()
export const fetchCode = async (code) => {
    try {
        const roomQuery = query(
            collection(db, 'rooms'),
            where('room_code', '==', code)
        )
        const querySnapshot = await getDocs(roomQuery)
        console.log('Checked if room code exist:', code)
        return !querySnapshot.empty
    }
    // Log error in case of failure and throw it forward
    catch (error) {
        console.error('Checking if room code exist failed:', error)
        throw error
    }
}

// Add room to Firestore -- called in handleCreateButton()
export const addRoom = async () => {
    try {
        // Get current user
        const user = authUser()
        // Create code until find unique one
        let code
        let isTaken = true
        while (isTaken) {
            code = createCode()
            isTaken = await fetchCode(code)
        }
        // Add room
        const roomRef = doc(db, 'rooms', code)
        await setDoc(roomRef, {
            room_code: code,
            created_by: user.uid,
            created_at: new Date(),
        })
        console.log('Added room:', code)
        // Add room code to local storage
        localStorage.setItem('lastRoom', code)
        return code
    }
    // Log error in case of failure and throw it forward
    catch (error) {
        console.error('Adding room failed:', error)
        throw error
    }
}

// Delete last room user added in Firestore -- called in handleCreateButton()
export const deleteRoom = async () => {
    try {
        // Get current user
        const user = authUser()
        // Fetch latest room
        const querySnapshot = await fetchRoom(user)
        const roomDoc = querySnapshot.docs[0]
        const code = roomDoc.id
        // Delete latest room
        await deleteDoc(doc(db, 'rooms', code))
        console.log('Deleted last room user added:', code)
    }
    // Log error in case of failure and throw it forward
    catch (error) {
        console.error('Deleting last room user added failed:', error)
        throw error
    }
}

// Join room in Firestore.. -- called in handleJoinButton()
export const joinRoom = async (code) => {
    try {
        // ..if room exist
        const roomExists = await fetchCode(code)
        // Throw error to log in case of room does not exist
        if (!roomExists) {
            throw new Error('Room does not exist')
        }
        console.log('Joined room:', code)
        // Add room code to local storage
        localStorage.setItem('lastRoom', code)
    }
    // Log error in case of failure and throw it forward
    catch (error) {
        console.error('Joining room failed:', error)
        throw error
    }
}
