import React, {useState, useEffect} from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  console.log(state.interviewers);

  const dailyAppointments = getAppointmentsForDay(state, state.day) //refactor from (state, state.day) to (state, day) in activity "Retrieving interviewer data"

  const daysURL = 'http://localhost:8001/api/days';
  const appointmentsURL = 'http://localhost:8001/api/appointments';
  const interviewersURL = 'http://localhost:8001/api/interviewers'
  
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    })
  }, [])

const schedule = dailyAppointments.map((oneAppointment) => {
    const interview = getInterview(state, oneAppointment.interview); //Added in in activity "Retrieving interviewer data"
  return (
    <Appointment 
  key={oneAppointment.id} 
  {...oneAppointment} 
  interview={interview}
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
  days={state.days} 
  value={state.day} // refactored from day={day} 
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




