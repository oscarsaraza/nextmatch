import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

import { writable } from 'svelte/store'

type UserInfo = { id: string; email: string | null; name: string | null; picture: string | null }

const userStore = writable<UserInfo | null>()

export function userAuth() {
  const firebaseConfig = {
    apiKey: 'AIzaSyBz93TU0WJRQHL3Mn4gFzpqsUrbDLLMN_w',
    authDomain: 'nextmatch-400717.firebaseapp.com',
    projectId: 'nextmatch-400717',
    storageBucket: 'nextmatch-400717.appspot.com',
    messagingSenderId: '1093148100174',
    appId: '1:1093148100174:web:947528323db142d20ba51f',
    measurementId: 'G-Q31P5YM8G7',
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const provider = new GoogleAuthProvider()
  provider.setDefaultLanguage('es')
  const auth = getAuth(app)

  auth.onAuthStateChanged((user) => {
    if (!user) userStore.set(null)
    else
      userStore.set({
        id: user.uid,
        email: user.email,
        name: user.displayName,
        picture: user.photoURL,
      })
  })

  function login() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        // console.log({ token, user })
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
        console.log(errorMessage)
      })
  }

  function logout() {
    auth.signOut()
  }

  return { login, logout, user: userStore }
}
