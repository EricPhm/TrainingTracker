


import AddNewChallenge from '../components/NewChallengeBtn'
import GetChallenges from '../components/showChallenges'



export default function Home() {
  return (
    <main>
      <h1>Challenges</h1>
      <GetChallenges/>
      <AddNewChallenge/>
    </main>
  )
}


