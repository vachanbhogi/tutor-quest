import { useEffect, useState } from 'react';
import Calendar from './../../components/calender/Calender';
import { Event } from './../../utils/types';
import { formatTime } from './../../utils/helpers';
import { firestore } from './../../firebase/firebase';
import {
    collection,
    doc,
    onSnapshot,
    updateDoc,
    DocumentData,
    QuerySnapshot,
    where,
    query,
} from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';

function Schedule() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [addEventOpen, setAddEventOpen] = useState<boolean>(false);
    const [availableSessions, setAvailableSessions] = useState<Event[]>([]);

    const user_id = useAuth().currentUser?.uid;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(firestore, 'events'), where('tutor_id', '==', id)),
            (snapshot: QuerySnapshot<DocumentData>) => {
                const eventsData: Event[] = [];
                snapshot.forEach((doc) => {
                    const eventData = doc.data() as Event;
                    eventData.event_id = doc.id;
                    eventsData.push(eventData);
                });
                setEvents(eventsData);
            }
        );

        return () => unsubscribe();
    }, [id]);

    const handleDateClick = (clickedDate: Date) => {
        setSelectedDay(clickedDate);
        const sessionsForDay = events.filter((event) => {
            return event.day === clickedDate.getDay() && !event.student_id;
        });
        if (sessionsForDay.length > 0) {
            setAvailableSessions(sessionsForDay);
            setAddEventOpen(true);
        }
    };

    const handleCloseAddEvent = () => {
        setAddEventOpen(false);
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setAddEventOpen(false);
        }
    };

    const handleBookSlot = async (event: Event) => {
        const eventRef = doc(collection(firestore, 'events'), event.event_id);
        try {
            await updateDoc(eventRef, { student_id: user_id });
            setAddEventOpen(false);
        } catch (error) {
            console.error('Error booking slot:', error);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKey, false);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey, false);
        };
    }, []);

    return (
        <div className='h-full flex justify-center items-center'>
            <Calendar onDateClick={handleDateClick} events={events} />
            {addEventOpen && (
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'>
                    <div className='bg-white p-8 rounded-lg relative w-96'>
                        <button
                            onClick={handleCloseAddEvent}
                            className='absolute top-4 right-4 text-red-500 hover:text-red-700'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                        <div className='flex flex-col items-center mb-4'>
                            <p className='text-lg font-semibold'>
                                Every{' '}
                                {
                                    [
                                        'Sunday',
                                        'Monday',
                                        'Tuesday',
                                        'Wednesday',
                                        'Thursday',
                                        'Friday',
                                        'Saturaday',
                                    ][selectedDay!.getDay()]
                                }{' '}
                                at:
                            </p>
                            <ul className='mt-2'>
                                {availableSessions.map((session, index) => (
                                    <li key={index} className='mb-2'>
                                        <button
                                            onClick={() =>
                                                handleBookSlot(session)
                                            }
                                            className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600'
                                        >
                                            {formatTime(
                                                new Date(
                                                    `2022-01-01 ${session.start_time}`
                                                ).getTime()
                                            )}{' '}
                                            -{' '}
                                            {formatTime(
                                                new Date(
                                                    `2022-01-01 ${session.start_time}`
                                                ).getTime() + session.duration
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Schedule;
