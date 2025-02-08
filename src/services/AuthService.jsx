// Firebase imports
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
// Internal service imports
import { auth } from '../Firebase.jsx'

// Sign in user anonymously in Firestore -- called in initializeAuthentication()
const signInUserAnonymously = async () => {
    try {
        const userCredential = await signInAnonymously(auth)
        console.log('Signed in user anonymously')
        return userCredential.user
    }
    // Log error in case of failure and throw it forward
    catch (error) {
        console.error('Signing in user anonymously failed:', error)
        throw error
    }
}

// Monitor authentication state -- called in initializeAuthentication()
const monitorAuthState = (callback) => onAuthStateChanged(auth, callback)

// Initialize authentication when app starts -- called in App()
export const initializeAuthentication = (setUser) => {
    const unsubscribe = monitorAuthState(async (user) => {
        setUser(user)
        if (user) {
            console.log('User is authenticated:', user.uid)
        }
        // Sign in user anonymously if user is not authenticated
        else {
            try {
                await signInUserAnonymously()
            }
            // Log error in case of failure
            catch (error) {
                console.error(error)
            }
        }
    })
    return unsubscribe
}

// Get current user -- called in functions for identification
export const authUser = () => {
    const user = auth.currentUser
    // Throw error to log in case of user is not authenticated
    if (!user) {
        throw new Error('User is not authenticated')
    }
    return user
}
