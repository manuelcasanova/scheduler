import React from "react";
import "./styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {

      const EMPTY = "EMPTY";
      const SHOW = "SHOW";
      const CREATE = "CREATE";
      const SAVING = "SAVING";
      const DELETING = "DELETING";
      const CONFIRM = "CONFIRM";
      const EDIT = "EDIT";
      const ERROR_SAVE = "ERROR_SAVE";
      const ERROR_DELETE = "ERROR_DELETE";
      
      const { mode, transition, back } = useVisualMode(
          props.interview ? SHOW : EMPTY
        );
    
        function save(name, interviewer) {
          const interview = {
            student: name,
            interviewer
          };
          transition(SAVING);

          props.bookInterview(props.id, interview).then(() => {
            transition(SHOW);
          })
          .catch(() => {transition(ERROR_SAVE, true)})
        }

        function deleteAppointment() {
          if (mode === CONFIRM) {
            transition(DELETING, true) 
            props.cancelInterview(props.id)
            .then(() => transition(EMPTY))
            .catch(() => transition(ERROR_DELETE, true))
          } else {
            transition(CONFIRM);
          }
        }

        function editAppointment() {
          transition(EDIT);
        }

        
return (

 

<article className="appointment"
data-testid="appointment">
<Header time={props.time}/>
{mode === EMPTY && 
  <Empty onAdd={() => transition(CREATE)} 
  />}

{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={deleteAppointment}
    onEdit={editAppointment}
  />
)}

{mode === CREATE && 
  <Form 
  name={props.name} 
  value={props.value} 
  interviewers={props.interviewers} 
  onCancel={back} 
  onSave={save}
  onDelete={deleteAppointment}
/>
}

{mode === SAVING && <Status message="Saving" />}
{mode === DELETING && <Status message="Deleting" />}
{mode === CONFIRM && <Confirm 
onCancel={back}
onConfirm={deleteAppointment}
 />}
{mode === EDIT && <Form
  name={props.interview.student}
  interviewers={props.interviewers || []}
  onSave={save}
  onCancel={back}
/>}

{mode === ERROR_SAVE && 
        <Error 
          message="Not able to create appointment"
          onClose={back}
        />
      }
      {mode === ERROR_DELETE && 
        <Error 
          message="Not able to cancel appointment"
          onClose={back}
        />
      }

</article>


)}

