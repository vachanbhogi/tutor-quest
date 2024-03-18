import { useEffect, useState } from 'react';
import { Event } from './../../utils/types'

type WeekViewProps = {
    setOpenModel: (index: number) => void;
    sessions: Event[]; // Use the Event interface instead of any[]
};

function WeekView({ setOpenModel, sessions }: WeekViewProps) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Use state to manage events
    const [events, setEvents] = useState<Event[]>(sessions);

    useEffect(() => {
        setEvents(sessions);
    }, [sessions]);

    // Sort events by start time
    useEffect(() => {
        const sortedEvents = [...events].sort((a, b) => {
            const timeA = new Date(`2022-01-01 ${a.start_time}`).getTime();
            const timeB = new Date(`2022-01-01 ${b.start_time}`).getTime();
            return timeA - timeB;
        });
        setEvents(sortedEvents);
    }, []); // Empty dependency array to run only once when component mounts

    return (
        <div className='p-8 max-w-screen max-h-screen w-full h-full flex flex-col'>
            <table className='w-full flex-1'>
                <thead>
                    <tr className='bg-gray-200'>
                        {days.map((day, index) => (
                            <th
                                key={index}
                                className='w-[14.2857%] text-xs font-medium text-gray-600 uppercase tracking-wider hover:bg-gray-500 py-2'
                            >
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {days.map((_, dayIndex) => (
                            <td
                                key={dayIndex}
                                className='w-[14.2857%] px-6 py-4 text-sm border-2 text-gray-800 relative cursor-pointer hover:bg-gray-100'
                                onClick={() => {
                                    setOpenModel(dayIndex);
                                }}
                            >
                                <div>
                                    {events
                                        .filter(
                                            (event) =>
                                                event.day === dayIndex
                                        )
                                        .map((event, index) => (
                                            <div
                                                key={index}
                                                className='bg-blue-200 text-xs text-blue-900 px-2 py-1 rounded mb-1 flex justify-between items-center'
                                            >
                                                {/* Display event details */}
                                                <div>{event['start_time']}</div>
                                                <div>{event['duration']/60/1000} min</div>
                                            </div>
                                        ))}
                                </div>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default WeekView;
