import Details from './details/Details';
import Availability from './availability/Availability';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

function TutorForm() {
    const [secondStage, setSecondStage] = useState<number>(0);
    const user = useAuth().currentUser;
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);

    return (
        <div className='p-8 flex flex-col items-center justify-center bg-slate-50 rounded-lg shadow-lg h-full'>
            {secondStage > 0 ? (
                <Availability />
            ) : (
                <Details set={setSecondStage} />
            )}
        </div>
    );
}

export default TutorForm;
