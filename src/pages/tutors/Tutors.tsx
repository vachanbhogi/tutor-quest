import {
    onSnapshot,
    query,
    collection,
    QuerySnapshot,
    DocumentData,
} from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase';
import { Profile } from '../../utils/types';
import { useNavigate } from 'react-router';

function Tutor() {
    const [tutors, setTutors] = useState<Profile[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(firestore, 'tutors')),
            (snapshot: QuerySnapshot<DocumentData>) => {
                const tutorsData: Profile[] = [];
                snapshot.forEach((doc) => {
                    const tutorData = doc.data() as Profile;
                    tutorsData.push({ ...tutorData, id: doc.id });
                });
                setTutors(tutorsData);
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-4xl font-bold mb-8'>Meet Our Tutors</h1>
            <div className='grid grid-cols-1 g:grid-cols-2 gap-8 w-full'>
                {tutors.map((tutor) => (
                    <div
                        key={tutor.id}
                        className='bg-white p-8 rounded-3xl drop-shadow-2xl w-1/2 max-h-96'
                        onClick={() => navigate('/schedule/' + tutor.id)}
                    >
                        <div className='flex items-center justify-between mb-4 text-center'>
                            <p className='text-4xl font-semibold mb-2'>
                                {tutor.user.displayName}
                            </p>
                            <img
                                src={tutor.user.photoURL!}
                                className='w-12 h-12 rounded-full'
                                alt='User Avatar'
                            />
                        </div>
                        <p className='text-gray-700 font-extralight truncate'>
                            {tutor.bio}
                        </p>
                        <div className='flex my-4'>
                            {tutor.courses?.map((course) => {
                                return (
                                    <div
                                        key={course}
                                        className='bg-blue-100 text-blue-800 px-2 py-1 mx-1 rounded-full flex items-center'
                                    >
                                        {course}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tutor;
