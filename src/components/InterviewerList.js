import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"

export default function InterviewerList (props) {

  const intervListIt = props.interviewers.map(interviewer => 
    
    <InterviewerListItem 
      key={interviewer.id}
      // id={interviewer.id} See refactor below
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      // Refactored from
      // setInterviewer={props.setInterviewer}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
    />
  )
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {intervListIt}
      </ul>
    </section>
  );
}