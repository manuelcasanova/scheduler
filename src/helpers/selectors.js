

//Return an array with all objects with an id

const matchAppointments = (appointments, ids) => {
  return ids.map(id => appointments[id]);
}


function getAppointmentsForDay(state, day) {
  //let appointmentArr = [];

  const selectDay = function(someDay) {
    if (someDay.name === day ) {
      return true
    }
    return false
}
 
    const dayObject = state.days.filter(selectDay)[0];

  if (dayObject) {
    return matchAppointments(state.appointments, dayObject.appointments);
  } else {
    return []
  }
}

function getInterviewersForDay(state, day) {
  //let interviewerArr = [];

  const selectDay = function(someDay) {
    if (someDay.name === day ) {
      return true
    }
    return false
}
 
    const dayObject = state.days.filter(selectDay)[0];

  if (dayObject) {
    return matchAppointments(state.interviewers, dayObject.interviewers);
  } else {
    return []
  }

}


function getInterview(state, interview) {
  if(!interview) return null;
  const filteredInterview = {};
  filteredInterview.student = interview.student;
  filteredInterview.interviewer = state.interviewers[interview.interviewer];
  return filteredInterview;
}

  //Used to update the spots in functions bookInterview and cancelInterview
  function whichDay(day) {
    const weekDay = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return weekDay[day]
  }

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay, whichDay };