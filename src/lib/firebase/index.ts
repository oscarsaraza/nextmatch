import { dev } from '$app/environment'
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore, connectFirestoreEmulator } from 'firebase/firestore'

let app: FirebaseApp

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    const firebaseConfig = {
      apiKey: 'AIzaSyBz93TU0WJRQHL3Mn4gFzpqsUrbDLLMN_w',
      authDomain: 'nextmatch-400717.firebaseapp.com',
      projectId: 'nextmatch-400717',
      storageBucket: 'nextmatch-400717.appspot.com',
      messagingSenderId: '1093148100174',
      appId: '1:1093148100174:web:947528323db142d20ba51f',
      measurementId: 'G-Q31P5YM8G7',
    }
    app = initializeApp(firebaseConfig)
  }
  return app
}

let db: Firestore

export function getFirebaseDB() {
  if (!db) {
    db = getFirestore(getFirebaseApp())
    if (dev) connectFirestoreEmulator(db, 'localhost', 8080)
  }
  return db
}

let auth: Auth

export function getFirebaseAuth() {
  if (!auth) {
    auth = getAuth(getFirebaseApp())
    if (dev) connectAuthEmulator(auth, "http://localhost:9099")
  }
  return auth
}