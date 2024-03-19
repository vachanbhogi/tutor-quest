// Dashboard.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    doc,
} from '@firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { Event, Profile } from '../../utils/types';
import Tabs from '../../components/tabs/Tab';
import Events from './tabs/Upcoming';
import Chat from './tabs/Chat';

function Dashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [tutorNames, setTutorNames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const user = useAuth().currentUser;

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchData = async () => {
            const snapshot = await getDocs(
                query(
                    collection(firestore, 'events'),
                    where('student_id', '==', user.uid)
                )
            );
            const eventsData: Event[] = [];
            const tutorIdsSet: Set<string> = new Set();

            snapshot.docs.forEach((d) => {
                const eventData = d.data() as Event;
                eventsData.push(eventData);
                const tutorId = eventData.tutor_id;
                tutorIdsSet.add(tutorId);
            });

            const tutorIdsArray = Array.from(tutorIdsSet);

            const tutorNamesData: string[] = [];

            await Promise.all(
                tutorIdsArray.map(async (tutorId) => {
                    const tutorDocRef = doc(firestore, 'tutors', tutorId);
                    const tutorDocSnapshot = await getDoc(tutorDocRef);
                    if (tutorDocSnapshot.exists()) {
                        const tutorData = tutorDocSnapshot.data() as Profile;
                        tutorNamesData.push(tutorData.user.displayName);
                    }
                })
            );

            setEvents(eventsData);
            setTutorNames(tutorNamesData);
            setLoading(false);
        };

        fetchData();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (tutorNames.length === 0) {
        return <div>No tutors found.</div>;
    }

    const eventTabContent = <Events events={events} />;
    const tutorTabContent = <Chat tutorNames={tutorNames} />;

    const tabs = [
        { label: 'Upcoming', content: eventTabContent },
        { label: 'Chat', content: tutorTabContent },
    ];

    return (
        <div className='container mx-auto px-4 py-8 h-full'>
            <h1 className='text-4xl font-bold mb-8'>Your Tutors</h1>
            <div className='flex flex-col h-5/6'>
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
}

export default Dashboard;
