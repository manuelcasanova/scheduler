

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

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };