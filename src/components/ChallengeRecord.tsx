import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";

interface Challenge {
    id: number;
    name: string;
    segment: { name: string }[];
}

function ChallengeRecord() {
    const { challengeId } = useParams<{ challengeId: string }>();
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [currentSegment, setCurrentSegment] = useState<number>(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [SegmentStartTime, setSegmentStartTime] = useState<number | null>(null);
    const [pauseTime, setPauseTime] = useState<number | null>(null);
    const [pauseDuration, setPauseDuration] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [SegmentElapsedTime, setSegmentElapsedTime] = useState<number>(0);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isPausing, setPause] = useState<boolean>(false);
    // time for each segment when clicked next
    const [segmentTimes, setSegmentTimes] = useState<number[]>([]);


    useEffect(() => {
        if (!challengeId) {
            return; // Handle case where challengeId is undefined
        }
        
        const storedChallenges = localStorage.getItem('challenges');
        if (storedChallenges) {
            // get the challenge array 
            const parsedChallenges: Challenge[] = JSON.parse(storedChallenges);
            // find the challenge match the ChallengeId
            const foundChallenge = parsedChallenges.find((ch) => ch.id === parseInt(challengeId));
            if (foundChallenge) {
                setChallenge(foundChallenge);
                // fill array of time = 0 for each segment
                setSegmentTimes(new Array(foundChallenge.segment.length).fill(0));
            } 
        }
    }, [challengeId]);


    useEffect(() => {
        let timer: number| undefined
        if (isRecording && startTime && SegmentStartTime !== null && !isPausing) {
            // call every 1 second
            timer = setInterval(() => {
                // set segment time bc segment time is diff when clicked next
                setSegmentElapsedTime(Date.now() - SegmentStartTime - pauseDuration);
                setElapsedTime(Date.now() - startTime - pauseDuration);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRecording, startTime, isPausing, pauseDuration,SegmentStartTime]);


    
    const handleStartBtn = () => {
        setStartTime(Date.now())
        setSegmentStartTime(Date.now())
        setIsRecording(true)
        setPause(false)
        setPauseDuration(0)
        setElapsedTime(0)
        setSegmentElapsedTime(0)

    }
    
    const handlePauseBtn = () => {
        setPause(true)
        setPauseTime(Date.now())
    }

    const handleContinueBtn = () => {
        if(!pauseTime) {
            return
        }    
        // Store the pause time when pause to set it to be the start time
        const NewPauseDuration = pauseDuration + (Date.now() - pauseTime)
        setPauseDuration(NewPauseDuration)
        setPauseTime(null)
        setPause(false)
    }

    const handleNextBtn = () => {
        // keep time for each segment
        setSegmentTimes((prevTime) => {
            const updatedTimes = [...prevTime]
            updatedTimes[currentSegment] = SegmentElapsedTime
            return updatedTimes
        })

        // setSegmentTimes([...segmentTimes, elapsedTime])
        if (challenge && currentSegment < challenge.segment.length - 1) {
            setCurrentSegment(currentSegment + 1);
            setSegmentStartTime(Date.now())
            setSegmentElapsedTime(0)
            setPauseDuration(0)
        } else {
            setIsRecording(false)
        }
    }

    const handleEndBtn = () => {
        // kept the data for each segment
        setSegmentTimes((prevTime) => {
            const updatedTimes = [...prevTime]
            updatedTimes[currentSegment] = SegmentElapsedTime
            return updatedTimes
        })
        setIsRecording(false)
    }

    const formatTime = (ms: number) => {
        const duration = moment.duration(ms);
        return `${String(duration.hours()).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}`;
    };

    if (!challenge) {
        return <div>Not Found</div>
    }

    return (
        <div>
            <h2>{challenge.name}</h2>
            <div>{formatTime(elapsedTime)}</div>
            <ul>
                {challenge.segment.map((seg, index) => (
                    <li key={index}>
                        <div>{seg.name}</div>         
                        {
                            // check if the it is start recording
                            index === currentSegment && isRecording ? (
                                <div>{formatTime(SegmentElapsedTime)}</div>
                            ) : (
                                <div>{formatTime(segmentTimes[index])}</div>
                            )
                        }
                    </li>
                ))}
            </ul>
            <div>
                {!isRecording ? (
                    <button onClick={handleStartBtn}>Start</button>
                ) : (
                    <>
                        {
                            !isPausing ? (
                                <button onClick={handlePauseBtn}>Pause</button>
                            ) : (
                                <button onClick={handleContinueBtn}>Continue</button>
                            )
                        }
                        
                        <button onClick={handleNextBtn}>Next</button>
                        <button onClick={handleEndBtn}>End</button>
                    
                    </>
                )}
            </div>
        </div>
    );
}

export default ChallengeRecord;
