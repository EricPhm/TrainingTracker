

import { useNavigate } from "react-router-dom";


function ReturnMain(){
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate('/')
    }

    return(
        <button onClick={ handleGoBack }> Back </button>
    )
}

export default ReturnMain