import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Define the type for a challenge object
interface Challenge {
    id: number
    name: string
}

function GetChallenges(){
    const navigate = useNavigate()

    const [challenges, setChallenges] = useState<Challenge[]>([])
    // Load data from local storage on component 
    useEffect(() => {
        const storedChallenges = localStorage.getItem('challenges')
        if (storedChallenges) {
            const parsedChallenges = JSON.parse(storedChallenges)
            setChallenges(parsedChallenges)
        }
    }, [])
    

    const handleSeeChallenge = ( challengeId: number ) => {
        navigate(`/challenge-recording/${challengeId}`)
    } 

    return (
        <div>
            {challenges.map((challenge) => (
                <div key={challenge.id}>
                    {/* Display the name of the challenge */}
                    {challenge.name}
                    <button onClick={ () => handleSeeChallenge(challenge.id) }>View Challenge</button>
                </div>  
            ))}
        
        </div>
    )
}

export default GetChallenges