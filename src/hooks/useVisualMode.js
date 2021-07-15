import { useState } from 'react';

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  
  //build a stack-structure(FIFO) mode history array 
  // add new mode: push to first
  
  const [history, setHistory] = useState([initialMode]);
  
  function transition(mode, replace = false){
    if (replace) {
      setMode(mode);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  };

  //go previous mode: pop the last (
  //bottom is the initial one, can't go further(undefined)
  function back(){
    if (history.length < 2) {
      setMode(initialMode);
    } else {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  }
  
  return { mode, transition, back };
};

