import { dev } from '$app/environment';
import { getFirebaseApp } from '$lib/firebase'
import { GoogleAuthProvider, getAuth, signInWithPopup, connectAuthEmulator } from 'firebase/auth'

import { writable } from 'svelte/store'

type UserInfo = { id: string; email: string | null; name: string | null; picture: string | null }

const userStore = writable<UserInfo | null>()

export function userAuth() {
  const provider = new GoogleAuthProvider()
  provider.setDefaultLanguage('es')
  const auth = getAuth(getFirebaseApp())
  if (dev) connectAuthEmulator(auth, "http://localhost:9099")

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

  return { login, logout, user: userStore, currentUser: auth.currentUser }
}
