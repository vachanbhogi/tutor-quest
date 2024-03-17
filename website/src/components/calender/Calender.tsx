import { useEffect, useState } from "react";

type CalendarProps = {
    onDateClick: (day : Date) => void
}

function Calendar({ onDateClick }: CalendarProps) {
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
    
    

    return (
        <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between w-full mb-8">
                <button className="text-2xl font-bold text-gray-600 hover:text-gray-900" onClick={previousMonth}>&#8249;</button>
                <h1 className="text-4xl font-bold">{months[currentMonth]} {currentYear}</h1>
                <button className="text-2xl font-bold text-gray-600 hover:text-gray-900" onClick={nextMonth}>&#8250;</button>
            </div>
            <table className="w-full flex-1 bg-white rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-200">
                        {days.map((day, index) => (
                            <th key={index} className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(Math.ceil((firstDayOfMonth + daysInMonth) / 7)).keys()].map((weekIndex) => (
                        <tr key={weekIndex}>
                            {[...Array(7).keys()].map((dayIndex) => {
                                const dayNumber = weekIndex * 7 + dayIndex + 1 - firstDayOfMonth;
                                const isToday = dayNumber === today && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
                                const isOutOfRange = dayNumber <= 0 || dayNumber > daysInMonth;

                                return (
                                    <td key={dayIndex} className={`px-6 py-4 text-sm border-2 text-gray-800 ${isOutOfRange ? 'text-gray-400' : ''}`} onClick={() => handleDateClick(dayNumber)}>
                                        <div className={`relative w-12 h-12 flex items-center justify-center ${isToday ? 'bg-blue-500 text-white rounded-full' : ''}`}>
                                            {dayNumber > 0 && dayNumber <= daysInMonth && (
                                                <p className={`text-xs ${isToday ? 'text-white' : 'text-black'}`}>{dayNumber}</p>
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
