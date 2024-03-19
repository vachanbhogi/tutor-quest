import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { firestore } from '../../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore'; // Import addDoc function
import WeekView from '../../../components/week-view/WeekView';
import { useNavigate } from 'react-router';

function Availability() {
    const [openModel, setOpenModel] = useState<number | null>(null);
    const [sessions, setSessions] = useState<any[]>([]);
    const [duration, setDuration] = useState<number>(30);
    const [startTime, setStartTime] = useState<string>('5:00 PM');
    const [isValidTimeRange, setIsValidTimeRange] = useState<boolean>(true);
    const user = useAuth().currentUser
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!startTime) {
            alert('Please select a start time.');
            return;
        }

        const start = new Date(`01/01/2000 ${startTime}`);
        const end = new Date(start.getTime() + duration * 60000);

        const isSameDay = start.getDate() === end.getDate();

        setIsValidTimeRange(isSameDay);

        if (isSameDay) {
            const newSession = { tutor_id: user?.uid, start_time: startTime, duration: duration * 60 * 1000, day: openModel, title:'' , tutor_name: user?.displayName};
            setSessions([...sessions, newSession]);
            setStartTime('5:00 PM');
            setOpenModel(null);
        }
    };

    const sendData = async () => {
        sessions.forEach(async (session) => {
            try {
                // Add session to Firestore collection
                await addDoc(collection(firestore, 'events'), session);
                console.log('Session added to Firestore:', session);
            } catch (error) {
                console.error('Error adding session to Firestore:', error);
            }
        });
        navigate('/');
    };

    return (
        <>
            <div className='flex justify-between items-center w-full'>
                <h1 className='text-4xl font-bold'>Set Availability</h1>
                <button className='bg-blue-500 text-white py-4 px-16 rounded-lg hover:bg-blue-600 focus:outline-none' onClick={sendData}>
                    Done
                </button>
            </div>
            <WeekView sessions={sessions} setOpenModel={setOpenModel} />{' '}
            {openModel != null && (
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'>
                    <div className='bg-white p-8 rounded-lg relative w-96'>
                        <form
                            className='flex flex-col relative'
                            onSubmit={handleSubmit}
                        >
                            <button
                                onClick={() => setOpenModel(null)}
                                className='absolute top-0 right-0 text-red-500 hover:text-red-700 z-10'
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
                            <label
                                htmlFor='start-time'
                                className='text-lg font-semibold mb-1'
                            >
                                Start Time
                            </label>
                            <input
                                id='start-time'
                                type='time'
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                                className='border rounded-md px-3 py-2 mb-4 focus:outline-none'
                            />
                            <label
                                htmlFor='duration'
                                className='text-lg font-semibold mb-1'
                            >
                                Duration
                            </label>
                            <select
                                id='duration'
                                value={duration}
                                onChange={(e) =>
                                    setDuration(Number(e.target.value))
                                }
                                required
                                className='border rounded-md px-3 py-2 mb-4 focus:outline-none'
                            >
                                <option value={30}>30 minutes</option>
                                <option value={45}>45 minutes</option>
                                <option value={60}>60 minutes</option>
                            </select>
                            {!isValidTimeRange && (
                                <p className='text-red-500 text-sm mb-4'>
                                    Please enter a valid time range (30 minutes
                                    - 1 hour) on the same day.
                                </p>
                            )}
                            <button
                                type='submit'
                                className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none mt-4'
                            >
                                Add Session
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Availability;
