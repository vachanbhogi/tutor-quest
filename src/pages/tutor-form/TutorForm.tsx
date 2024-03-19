import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { doc, getDoc } from '@firebase/firestore';
import { firestore } from '../../firebase/firebase';
import Details from './details/Details';
import Availability from './availability/Availability';

function TutorForm() {
    const [secondStage, setSecondStage] = useState<number>(0);
    const [isTutor, setIsTutor] = useState<boolean | null>(null); // Initially unknown
    const user = useAuth().currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        const checkTutorStatus = async () => {
            if (!user) {
                navigate('/');
                return;
            }
            const tutorRef = doc(firestore, 'tutors', user.uid);
            try {
                const tutorDoc = await getDoc(tutorRef);
                setIsTutor(tutorDoc.exists());
            } catch (error) {
                console.error('Error checking tutor status:', error);
            }
        };

        checkTutorStatus();
    }, [user, navigate]);

    if (isTutor === null) {
        // Loading state
        return (
            <div className='p-8 flex flex-col items-center justify-center bg-slate-50 rounded-lg shadow-lg h-full'>
                Loading...
            </div>
        );
    }

    if (isTutor) {
        // User is already a tutor
        return (
            <div className='flex-grow flex justify-center items-center text-gray-600 text-xl font-semibold'>
                Looks like you're already a tutor.
            </div>
        );
    }

    // User is not a tutor
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
