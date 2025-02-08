// Firebase imports
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCJtvE7-ddjqJ_jwaJfY5rV35lePdJzo5I',
    authDomain: 'wonders-scoreboard-ff800.firebaseapp.com',
    projectId: 'wonders-scoreboard-ff800',
    storageBucket: 'wonders-scoreboard-ff800.firebasestorage.app',
    messagingSenderId: '651654940654',
    appId: '1:651654940654:web:9060e31af05f6a3e7230ff',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase authentication
export const auth = getAuth(app)

// Initialize Firestore
export const db = getFirestore(app)
