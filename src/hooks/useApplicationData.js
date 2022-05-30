import {useState, useEffect} from "react";
import axios from "axios";
import { whichDay } from "helpers/selectors";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function setDay(day) {
    setState({...state, day})
  }

  const daysURL = 'http://localhost:8001/api/days';
  const appointmentsURL = 'http://localhost:8001/api/appointments';
  const interviewersURL = 'http://localhost:8001/api/interviewers'

  useEffect(() => {
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    })
  }, [])



  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const weekDay = whichDay(state.day)

    let day = {
      ...state.days[weekDay],
      spots: state.days[weekDay]
    }

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[weekDay],
        spots: state.days[weekDay].spots - 1
      } 
    } else {
      day = {
        ...state.days[weekDay],
        spots: state.days[weekDay].spots
      } 
    }

    let days = state.days
    days[weekDay] = day;


    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview:interview})
    .then(res => {
        setState({...state, appointments, days})
        return res
      })
  }

  function cancelInterview(id) {
    // console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const weekDay = whichDay(state.day)

    const day = {
      ...state.days[weekDay],
      spots: state.days[weekDay].spots + 1
    }

    let days = state.days
    days[weekDay] = day;


    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(res => {
        setState({...state, appointments, days})
        return res
      })
  }
return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}

}