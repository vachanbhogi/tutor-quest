import Calendar from "./components/calender/Calender"

function App(){
  return (
    <div className="h-screen">
      <Calendar onDateClick={day => console.log(day)} />
    </div>
  )
}

export default App