import { useEffect, useState } from "react";
import Calendar from "./components/calender/Calender";
import { Event } from "./utils/types";
import { formatTime } from "./utils/helpers";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [addEventOpen, setAddEventOpen] = useState<boolean>(false);
  const [availableSessions, setAvailableSessions] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  const handleDateClick = (clickedDate: Date) => {
    setSelectedDay(clickedDate);
    const sessionsForDay = events.filter((event) => {
      const eventDate = new Date(event.start_time);
      return (
        eventDate.toDateString() === clickedDate.toDateString() &&
        !event.student_id
      );
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
    if (event.key === "Escape") {
      setAddEventOpen(false);
    }
  };

  const handleBookSlot = (event: Event) => {
    const studentId = "hello world";
    fetch(`http://localhost:3000/events/${event.event_id}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const updatedEvents = events.map((e) =>
            e.event_id === event.event_id ? { ...e, student_id: studentId } : e
          );
          setEvents(updatedEvents);
          setAddEventOpen(false);
        } else {
          console.log("Failed to book event:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error booking slot:", error);
      });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey, false);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey, false);
    };
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <Calendar onDateClick={handleDateClick} events={events} />
      {addEventOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg relative w-96">
            <button
              onClick={handleCloseAddEvent}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col items-center mb-4">
              <p className="text-lg font-semibold">
                {selectedDay?.toDateString()}:
              </p>
              <ul className="mt-2">
                {availableSessions.map((event, index) => (
                  <li key={index} className="mb-2">
                    <button
                      onClick={() => handleBookSlot(event)}
                      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {formatTime(event.start_time)} -{" "}
                      {formatTime(event.start_time + event.duration)}
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

export default App;
