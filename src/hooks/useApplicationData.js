import { useState, useEffect } from "react";
import axios from 'axios';
import {getSpots} from 'helpers/selectors';
export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
//when appointments.interview is not null, then booked
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

    const spots = getSpots(appointments, state.days, state.day);
    const currentDayIndex = state.days.findIndex(obj => obj.name === state.day);

    const day = {
      ...state.days[currentDayIndex],
      spots
    }

    state.days[currentDayIndex] = day
    const days = [
      ...state.days,
    ]

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment).then(() => {
      setState(prev => ({...prev, appointments, days}));
    })
  }

  function cancelInterview (id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments ={
      ...state.appointments,
      [id]: appointment
    }

    const spots = getSpots(appointments, state.days, state.day);
    const currentDayIndex = state.days.findIndex(obj => obj.name === state.day);

    const day = {
      ...state.days[currentDayIndex],
      spots
    }

    state.days[currentDayIndex] = day
    const days = [
      ...state.days,
    ]
    
    return axios.delete(`http://localhost:8001/api/appointments/${id}`,appointment).then(() => {
      setState(prev => ({...prev, appointments, days}));
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