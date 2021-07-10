
export default function getAppointmentsForDay(state, day) {
  let result = [];

  if(state.days.length === 0) {
    return result;
  } 

  const dayInfo = state.days.find((d) => {
    if(d.name === day)
      return d.appointments;
  });

    dayInfo && dayInfo.appointments.map((appt) => {
    result.push(state.appointments[appt]);
  })

  return result;
};

