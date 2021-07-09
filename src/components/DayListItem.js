import React from 'react';
import './DayListItem.scss';

var classNames = require('classnames');

export default function DayListItem(props){
  let dayClass = classNames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (num) => {
    if(num === 0) 
      return "no spots";
    else if(num === 1)
      return num + " spot";
    else 
      return num + " spots";
  };

  return(
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  )
}