
function getAppointmentsForDay(state, day) {
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

function getInterviewersForDay(state, day) {
  let result = [];

  if(state.days.length === 0) {
    return result;
  } 

  const dayInfo = state.days.find((d) => {
    if(d.name === day)
      return d.interviewers;
  });

    dayInfo && dayInfo.interviewers.map((appt) => {
    result.push(state.interviewers[appt]);
  })

  return result;
};

function getInterview(state, interview){

  if(interview){
    const interviewers = Object.values(state.interviewers);
    interview.interviewer = interviewers[interview.interviewer-1];

    return interview;
  } else {
    return null;
  }
};

export {getAppointmentsForDay, getInterviewersForDay, getInterview};