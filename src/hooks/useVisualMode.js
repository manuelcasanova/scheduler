import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode)
      history.push(newMode)      
    } else {
      setMode(newMode)
    }
  }

  return { mode, transition };
}

