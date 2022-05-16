// import React from "react";
// import DayListItem from "components/DayListItem";

// export default function DayList(props) {

// //const DayListIt = props.DayListItem.map(DayList =>{

//   const {days} = props;
//   const DayListIt = days.map(DayList =>{


//   return (
//     <DayListItem
//       key={DayList.id}
//       name={DayList.name}
//       spots={DayList.spots}
//       selected={DayList.name === props.day}
//       setDay={DayList.setDay}
//       />
//   );
// });

//   return (
//     <ul>
//       {DayListIt}
//     </ul>
//   );
// }

//With Ian

import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const {days, day, setDay} = props;


  return (
    <ul>
      {days.map(dayOfWeek =>{
        return (
          <DayListItem
            key={dayOfWeek.id}
            name={dayOfWeek.name}
            spots={dayOfWeek.spots}
            selected={dayOfWeek.name === props.day}
            setDay={props.setDay}
            />
          );
      })}
    </ul>
  );
}