import { Event } from '../../../utils/types';

type UpcomingProps = {
    events: Event[];
};

const Upcoming = ({ events }: UpcomingProps) => {
    return (
        <div className='bg-white p-8 rounded-3xl drop-shadow-2xl w-full h-full overflow-auto'>
            {events.map((event, index) => (
                <div key={index}>
                    <p className='text-2xl font-semibold mb-2'>
                        {event.student_id}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Upcoming;
