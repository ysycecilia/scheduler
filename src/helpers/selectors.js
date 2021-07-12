
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
  const interviewers = [];
  const days = state.days.filter(dayX => dayX.name === day);
  const interviewersDay = days[0].interviewers;
  for (const interview in state.interviewers) {
    if (interviewersDay.includes(state.interviewers[interview].id)) {
      interviewers.push(state.interviewers[interview]);
    }
  }
  return interviewers;
};

function getInterview(state, interview){

  if(interview){
    const interviewer = state.interviewers[interview.interviewer];
    const student = interview.student;
    
    const result = {
    student,
    interviewer
    };

    return result;
  } else {
    return null;
  }
};

export {getAppointmentsForDay, getInterviewersForDay, getInterview};