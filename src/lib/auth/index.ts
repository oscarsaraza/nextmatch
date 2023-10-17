import { getFirebaseAuth } from '$lib/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { writable } from 'svelte/store'

type UserInfo = {
  isReady: boolean
  state: 'no-user'
} |
{
  isReady: boolean
  state: 'logged'
  id: string
  email: string | null
  name: string | null 
  picture: string | null 
}

const userStore = writable<UserInfo>({ isReady: false, state: 'no-user' })

userStore.subscribe((userInfo) => console.log(userInfo))

export function userAuth() {
  const auth = getFirebaseAuth()
  const provider = new GoogleAuthProvider()
  provider.setDefaultLanguage('es')

  auth.authStateReady().then(() => {
    userStore.update(state => ({ ...state, isReady: true }))
  })

  auth.onAuthStateChanged((user) => {
    if (!user) userStore.update((state) => ({ 
      isReady: true, 
      state: 'no-user'
    }))
    else userStore.update(state => ({
      isReady: true,
      state: 'logged',
      id: user.uid,
      email: user.email,
      name: user.displayName,
      picture: user.photoURL,
    }))
  })

  function login() {
    userStore.update(state => ({ ...state, isReady: false }))
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
        userStore.update(state => ({
          isReady: true,
          state: 'logged',
          id: user.uid,
          email: user.email,
          name: user.displayName,
          picture: user.photoURL,
        }))
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
    userStore.update(state => ({ ...state, isReady: false }))
    auth.signOut().then(() => userStore.update(state => ({ isReady: true, state: 'no-user' })))
  }

  return { login, logout, user: userStore }
}
