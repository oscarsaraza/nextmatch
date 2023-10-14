import { initializeApp, type FirebaseApp } from 'firebase/app'

let app: FirebaseApp | null = null

export function getFirebaseApp(): FirebaseApp {
  // Initialize Firebase
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
    return initializeApp(firebaseConfig)
  }
  return app
}
