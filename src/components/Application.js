import React, {useState, useEffect} from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";

//Mock appoitnments data. Eventyally will be retrieved from an API

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

export default function Application(props) {
  //const [day, setDay] = useState("Monday");

  const [day, setDay] = useState([]);
  const [days, setDayData] = useState([]);


  
  useEffect(() => {
    const url = 'http://localhost:8001/api/days'
    axios.get(url)
      .then(res => {
        setDayData(res.data)
      })
      .catch(err => console.log(err))
  }, [])


// console.log(appointments)
const appointmentsArray = Object.values(appointments);
// console.log(appointmentsArray);

const schedule = appointmentsArray.map((oneAppointment) => {
  //console.log("appt", oneAppointment)
  return (
    // <Appointment key={oneAppointment.id} id={oneAppointment.id} time={oneAppointment.time} interview={oneAppointment.interview} />
    <Appointment 
  key={oneAppointment.id} 
  {...oneAppointment} 
/>
  )
})


  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList 
  days={days} 
  value={day} // refactored from day={day} 
  onChange={setDay} /> 
</nav>
{/* refactored from "setDay={setDay} /> */}
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}




