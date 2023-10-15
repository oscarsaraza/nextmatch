import { getFirebaseAuth } from '$lib/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { writable } from 'svelte/store'

type UserInfo = {
  state: 'loading' | 'no-user'
} |
{
  state: 'logged'
  id: string
  email: string | null
  name: string | null 
  picture: string | null 
}

const userStore = writable<UserInfo>({ state: 'loading' })

export function userAuth() {
  const auth = getFirebaseAuth()
  const provider = new GoogleAuthProvider()
  let isReady = false
  provider.setDefaultLanguage('es')

  auth.authStateReady().then(() => isReady = true)

  auth.onAuthStateChanged((user) => {
    if (!isReady) userStore.set({ state: 'loading' })
    if (!user) userStore.set({ state: 'no-user' })
    else
      userStore.set({
        state: 'logged',
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
