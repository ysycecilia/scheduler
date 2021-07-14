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

    const spotsRemaining = getSpots(appointments, state.days, state.day);
    const currentDayIndex = state.days.findIndex(obj => obj.name === state.day);

    const day = {
      ...state.days[currentDayIndex],
      spots: spotsRemaining
    }

    state.days[currentDayIndex] = day
    const days = [
      ...state.days,
    ]
    console.log(day)

    // function findDay (){
    //   return state.days.find((day) => day.name === state.day);
    // }

    // async function updateSpots() {
      
    //   let spots = 0;
    //   let dayObj = await findDay();
    //   console.log(dayObj)
    //   dayObj.appointments.map((id) => {
    //     if (!state.appointments[id].interview) 
    //       spots++;
    //   })
    //   return spots;
    // }

    // const daysWithUpdatedSpots = state.days.map((day) => {
    //   return day.name === state.day ? { ...day, spots } : day
    // });

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment).then(() => {
      setState(prev => ({...prev, appointments, days}));
    })
    
  }

  function cancelInterview (id, interview){
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments ={
      ...state.appointments,
      [id]: appointment
    }

    const daysWithUpdatedSpots = state.days.map((day) => {
      if(day.name === state.day){
        day.spots++;
        return day
      }
        else 
      return day
    });

    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(() => {
      console.log('Delete successful')
    setState(prev => ({...prev, appointments}));
    }).then(() => {
      console.log(state);
      setState(prev => ({...prev, daysWithUpdatedSpots}));
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