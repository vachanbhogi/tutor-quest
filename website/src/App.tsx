import { useState } from "react";
import Calendar from "./components/calender/Calender";

function App() {
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [addEventOpen, setAddEventOpen] = useState<boolean>(false);
    const [availableSessions, setAvailableSessions] = useState<string[]>([]);

    const dummyEvents = [
        { title: "Event 1", student_id: "student1", tutor_id: "tutor1", event_id: "evt001", start_time: new Date("2024-03-20T09:00:00").getTime(), duration: 60 * 60 * 1000 },
        { title: "Event 2", student_id: "student2", tutor_id: "tutor2", event_id: "evt002", start_time: new Date("2024-03-20T13:00:00").getTime(), duration: 45 * 60 * 1000 },
        { title: "Event 3", student_id: "student3", tutor_id: "tutor3", event_id: "evt003", start_time: new Date("2024-03-25T11:00:00").getTime(), duration: 60 * 60 * 1000 },
        { title: "Event 4", student_id: "student3", tutor_id: "tutor3", event_id: "evt004", start_time: new Date("2024-03-25T11:00:00").getTime(), duration: 30 * 60 * 1000 },
    ];
    

    const handleDateClick = (clickedDate: Date) => {
        setSelectedDay(clickedDate);
        const formattedClickedDate = clickedDate.toISOString().split('T')[0];
        const sessionsForDay = dummyEvents
            .filter(event => event.event_id.startsWith(formattedClickedDate))
            .map(event => event.start_time.toLocaleString());
        setAvailableSessions(sessionsForDay);
        setAddEventOpen(true);
    };

    const handleCloseAddEvent = () => {
        setAddEventOpen(false);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <Calendar onDateClick={handleDateClick} events={dummyEvents} />
            {addEventOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <button onClick={handleCloseAddEvent}>Close</button>
                        <p>Date: {selectedDay?.toDateString()}</p>
                        <p>Available sessions:</p>
                        <ul>
                            {availableSessions.map(session => (
                                <li key={session}>
                                    <button onClick={() => console.log("Booked session at", session)}>{session}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
