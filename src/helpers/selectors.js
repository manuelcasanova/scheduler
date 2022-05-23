

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

module.exports = { getAppointmentsForDay };