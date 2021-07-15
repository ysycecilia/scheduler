function getAppointmentsForDay(state, day) {
  let result = [];

  if(state.days.length === 0) {
    return result;
  } 

  //find selected day and then save new appointment to state
  const dayInfo = state.days && state.days.find(d => d.name === day);
  dayInfo && dayInfo.appointments.forEach((appt) => {
    result.push(state.appointments[appt]);
  })

  return result;
};

function getInterviewersForDay(state, day) {
  const result = [];
  const dayInfo = state.days.filter(d => d.name === day);
 
  const interviewersDay = dayInfo[0].interviewers;
  
  interviewersDay && interviewersDay.forEach((itwer) => {
    if (interviewersDay.includes(state.interviewers[itwer].id)) {
      result.push(state.interviewers[itwer]);
    }
  })
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

//count available spots by the # of interviews with a null value
//cannot increase spots directly since edit and add use it to manage spots 
  function getSpots(appointments, days, day) {
    let spots = 0;
    let dayInfo = days.find((cd) => cd.name === day);
  
    dayInfo.appointments.forEach((id) => {
      if (!appointments[id].interview) 
        spots++;
    })
    return spots;
  }

export {getAppointmentsForDay, getInterviewersForDay, getInterview, getSpots};