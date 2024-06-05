

import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from "./routes/ChallengeListing.tsx"
import NotFoundPage from "./routes/NotFoundPage.tsx"
import AddNewChallenge from "./routes/ChallengeCreation.tsx"
import ChallengeRecording from "./routes/ChallengeRecording.tsx"
import './App.css'



function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-new-challenge" element={<AddNewChallenge />} />
          <Route path="/challenge-recording/:challengeId" element={<ChallengeRecording />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
