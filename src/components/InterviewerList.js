import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';

export default function InterviewerList(props){

  const interviewer = props.interviewers.map((intwer) => {
    return (
      <InterviewerListItem
        id={intwer.id}
        name={intwer.name}
        avatar={intwer.avatar}
        selected={intwer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
        />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewer}</ul>
    </section>
  )
}