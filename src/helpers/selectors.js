
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
  const result = [];
  const dayInfo = state.days.filter(d => d.name === day);
 
  const interviewersDay = dayInfo[0].interviewers;
  interviewersDay && interviewersDay.map((itwer) => {
    if (interviewersDay.includes(state.interviewers[itwer].id)) {
      result.push(state.interviewers[itwer]);
    }
  })
  // for (const interview in state.interviewers) {
  //   if (interviewersDay.includes(state.interviewers[interview].id)) {
  //     result.push(state.interviewers[interview]);
  //   }
  // }
  return result;
};

function getInterview(state, interview){

  if(interview){
    const interviewer = state.interviewers[interview.interviewer];
    const student = interview.student;
    
    const result = { student, interviewer};

    return result;
  } else {
    return null;
  }
};

export {getAppointmentsForDay, getInterviewersForDay, getInterview};