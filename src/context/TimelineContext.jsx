




import { createContext, useContext, useState } from "react";

const TimelineContext = createContext();

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState([]);

   const addEntry = (type, friendName) => {
    const newEntry = {
      id: Date.now(),
      title: `${type} with ${friendName}`, // Auto title: "Call with Sarah"
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }), // Auto Date: "April 17, 2026"
      type: type, // Call, Text,  Video
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}

