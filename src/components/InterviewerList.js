import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"
import PropTypes from 'prop-types';

export default function InterviewerList (props) {

  const intervListIt = props.interviewers.map(interviewer => 
    
    <InterviewerListItem 
      key={interviewer.id}
      // id={interviewer.id} See refactor below
      name={interviewer.name}
      avatar={interviewer.avatar}
      // Refactored from selected={interviewer.id === props.interviewer}
      selected={interviewer.id === props.value}
      // Refactored from
      // setInterviewer={props.setInterviewer}
      // And later refactored from
      // setInterviewer={() => props.setInterviewer(interviewer.id)}
      setInterviewer={() => props.onChange(interviewer.id)}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};