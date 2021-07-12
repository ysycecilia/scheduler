import React from 'react';
import './InterviewerListItem.scss';

var classNames = require('classnames');

export default function InterviewerListItem(props){
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  const imgClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": props.selected
  });

  return (
    <li className={interviewerClass}
        key={props.id}
        onClick={props.setInterviewer}>
      <img
        className={imgClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected? props.name : ""}
    </li>
  )
}