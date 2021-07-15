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

  const setDay = day => setState({ ...state, day });
  
  function bookInterview(id, interview){
    //store the new appointment
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    //save the new one to original appointments 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //get current spots and update the day data
    const spots = getSpots(appointments, state.days, state.day);
    const currentDayIndex = state.days.findIndex(obj => obj.name === state.day);

    const day = {
      ...state.days[currentDayIndex],
      spots
    }

    //replace current day with updated spots data
    state.days[currentDayIndex] = day
    const days = [
      ...state.days,
    ]


    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
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
    
    return axios.delete(`/api/appointments/${id}`,appointment).then(() => {
      setState(prev => ({...prev, appointments, days}));
    })
  }

  useEffect(() => {
    const GET_DAYS = "/api/days";
    const GET_APPOINTMENTS = "/api/appointments";
    const GET_INTERVIEWERS = "/api/interviewers";
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