import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview} from "helpers/selectors";
import {useApplicationData} from 'hooks/useApplicationData';

export default function Application(props){
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  // const setDay = day => setState({ ...state, day });

  //  function bookInterview(id, interview){
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: {...interview}
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment).then(() => {
  //     setState(prev => ({...prev, appointments}));
  //   })
  // }

  // function cancelInterview (id, interview){
  //   console.log(id)
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   }
  //   console.log(appointment)
  //   const appointments ={
  //     ...state.appointments,
  //     [id]: appointment
  //   }

  //   return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(() => {
  //     console.log('Delete successful')
  //    setState(prev => ({...prev, appointments}));
     
  //   })
  // }


  // useEffect(() => {
  //   const GET_DAYS = "http://localhost:8001/api/days";
  //   const GET_APPOINTMENTS = "http://localhost:8001/api/appointments";
  //   const GET_INTERVIEWERS = "http://localhost:8001/api/interviewers";
  //   const daysURL = axios.get(GET_DAYS);
  //   const appointmentsURL = axios.get(GET_APPOINTMENTS);
  //   const interviewersURL = axios.get(GET_INTERVIEWERS);

  //   Promise.all([
  //     Promise.resolve(daysURL),
  //     Promise.resolve(appointmentsURL),
  //     Promise.resolve(interviewersURL)
  //   ]).then((all) => {
  //     // console.log(all[0]); // first
  //     // console.log(all[1]); // second
  //     // console.log(all[2]); // third
  //     setState(prev => ({...prev, 
  //       days: all[0].data,     
  //       appointments: all[1].data, 
  //       interviewers: all[2].data 
  //     }));
  //   });
  // },[])
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return(
        <Appointment
          key={appointment.id} 
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
    )
  });

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
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />

      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

