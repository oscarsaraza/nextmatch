import { initializeApp } from 'firebase/app'
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBz93TU0WJRQHL3Mn4gFzpqsUrbDLLMN_w',
  authDomain: 'nextmatch-400717.firebaseapp.com',
  projectId: 'nextmatch-400717',
  storageBucket: 'nextmatch-400717.appspot.com',
  messagingSenderId: '1093148100174',
  appId: '1:1093148100174:web:947528323db142d20ba51f',
  measurementId: 'G-Q31P5YM8G7',
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

type Match = {
  datetime: Date
  requiredPlayers: number
  location: string
}

export async function createMatch(match: Match): Promise<string> {
  const docRef = await addDoc(collection(db, '/matches'), match)
  return docRef.id
}

export async function getMatches(): Promise<Array<Match>> {
  const snapshot = await getDocs(collection(db, '/matches'))
  const data: Array<Match> = []
  snapshot.forEach((doc) => data.push(doc.data() as Match))
  return data
}
