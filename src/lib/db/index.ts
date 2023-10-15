import { getFirebaseDB, } from '$lib/firebase'
import { Timestamp, addDoc, collection, getDocs, } from 'firebase/firestore'

export type Match = {
  datetime: Timestamp
  requiredPlayers: number
  location: string
}

const matches = collection(getFirebaseDB(), '/matches')

export async function createMatch(match: Match): Promise<string> {
  const docRef = await addDoc(matches, match)
  return docRef.id
}

export async function getMatches(): Promise<Array<Match>> {
  const snapshot = await getDocs(matches)
  const data: Array<Match> = []
  snapshot.forEach((doc) => data.push(doc.data() as Match))
  return data
}
