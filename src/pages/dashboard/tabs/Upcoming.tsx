import { Event } from '../../../utils/types';

type UpcomingProps = {
    events: Event[];
};

const Upcoming = ({ events }: UpcomingProps) => {
    const sortedEvents = events.sort((a, b) => {
        if (a.day !== b.day) {
            return a.day - b.day;
        }
        if (a.start_time !== b.start_time) {
            return b.start_time.localeCompare(a.start_time);
        }
        return 0;
    });

    return (
        <div className='bg-white p-8 rounded-3xl drop-shadow-2xl w-full h-full overflow-auto'>
            <h2 className='text-xl font-semibold mb-4 pb-4 w-full border-b-2'>
                Upcoming Events
            </h2>
            {sortedEvents.map((event, index) => {
                const daysOfWeek = [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                ];
                const dayOfWeek = daysOfWeek[event.day];
                const startTime = event.start_time;
                const durationMinutes = event.duration / (60 * 1000);

                return (
                    <div key={index} className='mb-6'>
                        <p className='text-lg font-semibold mb-1'>
                            {event.tutor_name}
                        </p>
                        <p className='text-sm text-gray-500'>
                            {dayOfWeek}, {startTime} ({durationMinutes} Minutes)
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default Upcoming;
