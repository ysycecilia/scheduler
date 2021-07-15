import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from'./Show';
import Empty from'./Empty';
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = " ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //save newly created appointment with status mode 
  function save(name, interviewer){
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    }).catch(() => {
      transition(ERROR_SAVE);
    })
  }

  function destroy(id){
    transition(DELETING, true);

    props.cancelInterview(props.id, props.interview).then(() => {
      transition(EMPTY)
    }).catch(() => {
      transition(ERROR_DELETE, true);
    })
  }


  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}

      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onCancel={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === SAVING && (
        <Status  message="Saving"
        />
      )}

      {mode === CONFIRM && (
        <Confirm 
        message="Are you sure you want to cancel this interview?"
        onCancel={back}
        onConfirm={destroy}  
        />
      )}

      {mode === DELETING && (
        <Status  message="Deleting"
        />
      )}

      {mode === EDIT && (
        <Form 
          id={props.id}
          interviewers={props.interviewers} 
          interviewer={props.interview.interviewer.id} 
          student={props.interview && props.interview.student}
          name={props.interview.student}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error  message="Could not save appointment"  onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error  message="Could not delete appointment" onClose={back}
        />
      )}
    </article>
  )
}