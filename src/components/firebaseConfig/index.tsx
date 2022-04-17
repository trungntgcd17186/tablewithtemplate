import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC92vy9RSvD_YLKxLI4BrH8fblpIjP3jaQ',
  authDomain: 'interntenomad.firebaseapp.com',
  projectId: 'interntenomad',
  storageBucket: 'interntenomad.appspot.com',
  messagingSenderId: '1024048172382',
  appId: '1:1024048172382:web:66f95eb55e67a33de213cf',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
