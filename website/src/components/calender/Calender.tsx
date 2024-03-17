import { useEffect, useState } from "react";
import { Event } from "../../types";

type CalendarProps = {
    onDateClick: (day: Date) => void;
    events: Event[];
};

function Calendar({ onDateClick, events }: CalendarProps) {
    const [daysInMonth, setDaysInMonth] = useState<number>(0);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(0);
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const today = new Date().getDate();

    useEffect(() => {
        const currentDate = new Date(currentYear, currentMonth);
        setDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate());
        setFirstDayOfMonth(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay());
    }, [currentMonth, currentYear]);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const previousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleDateClick = (dayNumber: number) => {
        const clickedDate = new Date(currentYear, currentMonth, dayNumber);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        if (dayNumber >= 1 && dayNumber <= lastDayOfMonth) onDateClick(clickedDate);
    };

    const getEventsForDate = (date: Date): Event[] => {
        return events.filter(event => {
            const eventDate = new Date(event.start_time);
            return eventDate.toDateString() === date.toDateString();
        });
    };

    return (
        <div className="p-8 max-w-screen max-h-screen w-full h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <button className="text-2xl font-bold text-gray-600 hover:text-gray-900" onClick={previousMonth}>&#8249;</button>
                <h1 className="text-4xl font-bold">{months[currentMonth]} {currentYear}</h1>
                <button className="text-2xl font-bold text-gray-600 hover:text-gray-900" onClick={nextMonth}>&#8250;</button>
            </div>
            <table className="w-full flex-1">
                <thead>
                    <tr className="bg-gray-200">
                        {days.map((day, index) => (
                            <th key={index} className="w-[14.2857%] px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(Math.ceil((firstDayOfMonth + daysInMonth) / 7)).keys()].map((weekIndex) => (
                        <tr key={weekIndex}>
                            {[...Array(7).keys()].map((dayIndex) => {
                                const dayNumber = weekIndex * 7 + dayIndex + 1 - firstDayOfMonth;
                                const currentDate = new Date(currentYear, currentMonth, dayNumber);
                                const isToday = dayNumber === today && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
                                const isOutOfRange = dayNumber <= 0 || dayNumber > daysInMonth;
                                const eventsForDate = getEventsForDate(currentDate);

                                return (
                                    <td key={dayIndex} className={`w-[14.2857%] px-6 py-4 text-sm border-2 text-gray-800 relative ${isOutOfRange ? 'text-gray-400' : ''}`} onClick={() => handleDateClick(dayNumber)}>
                                        <div className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center`}>
                                            {dayNumber > 0 && dayNumber <= daysInMonth && (
                                                <>
                                                    <p className={`absolute top-2 left-2 text-xs p-2 rounded-full ${isToday ? 'text-white bg-blue-500' : 'text-black'}`}>{dayNumber}</p>
                                                    {eventsForDate.length > 0 && (
                                                        <div className="mt-2 bg-blue-100 border-2 shadow-md rounded-lg w-full p-2">
                                                            {eventsForDate.map((event, index) => (
                                                                <div key={index} className="py-1 text-xs text-center">{formatTime(event.start_time)} - {formatTime(event.start_time + event.duration)}</div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Calendar;

const formatTime = (timestamp: number): string => {
    const time = new Date(timestamp)
    const hour = time.getHours();
    const minute = time.getMinutes().toString().padStart(2, '0');
    const meridian = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${meridian}`;
};
