import { dev } from '$app/environment'
import { getFirebaseApp } from '$lib/firebase'
import { Timestamp, addDoc, collection, getDocs, getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const db = getFirestore(getFirebaseApp())
if (dev) connectFirestoreEmulator(db, 'localhost', 9000)

type Match = {
  datetime: Timestamp
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
