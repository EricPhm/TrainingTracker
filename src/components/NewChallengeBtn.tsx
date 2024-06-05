

import { useNavigate } from 'react-router-dom';

function AddNewChallenge(){
    const navigate = useNavigate();

    const handle_AddNewChallenge = () => {
        navigate('/add-new-challenge')
    }

    // I just want it to navigate to that page
    return(
        <button onClick={handle_AddNewChallenge}>
          Go to Add New Challenge page
        </button>
    );
}
    
export default AddNewChallenge;