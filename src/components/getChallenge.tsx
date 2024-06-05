import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { challenge as challengeModel } from '../model/challengeInterface
import ReturnMain  from './ReturnMainBtn'

// Define the type for a challenge object - for highestId
interface Challenge {
    id: number
    name: string
    segment: { name: string }[]
}

function GetNameChallenge() { 
    const [challengeName, setChallengeName] = useState('')
    const [segmentInputs, setSegmentInputs] = useState<string[]>([''])

    const navigate = useNavigate();


    const handleAddChallenge = () => {
        if (!challengeName || !segmentInputs) return

        // Merge the new challenge with the existing challenges from local storage
        const existingChallenges = JSON.parse(localStorage.getItem('challenges') || '[]')
        
        // Determine the nextId based on the highest existing ID
        const highestId = existingChallenges.reduce((maxId: number, ch: Challenge) => Math.max(ch.id, maxId), 0)

        // Create new challenge with an incremented ID
        const newChallenge = {
            id: highestId + 1,
            name: challengeName,
            segment: segmentInputs.map(name => ({ name }))
        };        
        
        // Merge the new challenge with the existing challenges from local storage
        const updatedChallenges = [...existingChallenges, newChallenge]

        // setChallenges(updatedChallenges);
        setChallengeName('')
        setSegmentInputs([''])

        // Update local storage here
        localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
        navigate('/')
    };


    // delete segment input - does not need to change state 
    const handleDeleteSegment = (segmentIndex: number) => {
        // Remove the corresponding segment input
        setSegmentInputs(prevInputs => {
            const newInputs = [...prevInputs]
            newInputs.splice(segmentIndex, 1) // Remove the segment input at segmentIndex
            return newInputs;
        })
    }

  
    // create a new empty segment input 
    const handleAddSegmentInput = () => {
        setSegmentInputs([...segmentInputs, ''])
    }

    const handleSegmentInputChange = (index: number, value: string) => {
        const updatedInputs = [...segmentInputs]
        updatedInputs[index] = value
        setSegmentInputs(updatedInputs)
    }


    return (
        <div>
            <input
                type="text"
                placeholder="Enter challenge name"
                value={challengeName}
                onChange={(e) => setChallengeName(e.target.value)}
            />
            {segmentInputs.map((input, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Enter segment name"
                        value={input}
                        onChange={(e) => handleSegmentInputChange(index, e.target.value)}
                    />
                    <button onClick={() => handleDeleteSegment(index)}>Delete Segment</button>
                </div>
            ))}
            <button onClick={handleAddSegmentInput}>Add Segment</button>
            <button onClick={handleAddChallenge}>Add Challenge</button>
            <ReturnMain/>
        </div>
  );
}

export default GetNameChallenge