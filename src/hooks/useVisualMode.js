import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // const transition = (newMode, replace = false) => {
  //   if (!replace) {
  //     setMode(newMode)
  //     history.push(newMode)      
  //   } else {
  //     setMode(newMode)
  //   }
  // }

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory([...history, newMode])
    } else {
      const historyPrev = history.slice(0, -1);
      setHistory([...historyPrev, newMode])
    }
    setMode(newMode)
  }


  const back = () => {
    let newHistory = [...history];
   newHistory.pop(mode);
   setHistory(newHistory);
   if (history.length > 1) {
     setMode(newHistory[(newHistory.length - 1)]);
   }
 };

//  const back = () => {
//   history.length - 1 &&
//     setHistory(prev => {
//       const newArr = [...prev];
//       newArr.pop();
//       setMode(newArr[newArr.length - 1]);
//       return newArr;
//     });
// };

//  function back() {
//   if(history.length > 1) {
//     setHistory(history.slice(0, -1));
//     setMode(history[history.length-2]);
//   }
// }


  return { mode, transition, back };
}

