import React, { useState, useEffect } from "react";
import axios from 'axios';

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview){
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment).then(() => {
      setState(prev => ({...prev, appointments}));
    })
  }

  function cancelInterview (id, interview){
    console.log(id)
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    console.log(appointment)
    const appointments ={
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(() => {
      console.log('Delete successful')
    setState(prev => ({...prev, appointments}));
    
    })
  }


  useEffect(() => {
    const GET_DAYS = "http://localhost:8001/api/days";
    const GET_APPOINTMENTS = "http://localhost:8001/api/appointments";
    const GET_INTERVIEWERS = "http://localhost:8001/api/interviewers";
    const daysURL = axios.get(GET_DAYS);
    const appointmentsURL = axios.get(GET_APPOINTMENTS);
    const interviewersURL = axios.get(GET_INTERVIEWERS);

    Promise.all([
      Promise.resolve(daysURL),
      Promise.resolve(appointmentsURL),
      Promise.resolve(interviewersURL)
    ]).then((all) => {
      // console.log(all[0]); // first
      // console.log(all[1]); // second
      // console.log(all[2]); // third
      setState(prev => ({...prev, 
        days: all[0].data,     
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    });
  },[]);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}