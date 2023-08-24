import React, { createContext, useContext, useState } from 'react';

export type LoggingContextData = {
  logs: string[];
  addLog: (log: string) => void;
  clearLogs: () => void;
}

const LoggingContext = createContext<LoggingContextData>(null);

export function useLogging() {
  return useContext(LoggingContext);
}

export function LoggingProvider(props) {
  const [logs, setLogs] = useState(["one","two","three"]);

  const addLog = (log: string) => {
    setLogs(prevLogs => [...prevLogs, log]);
  }

  const clearLogs = () => {
    setLogs([]);
  }

  return (
    <LoggingContext.Provider
      value={{
        logs,
        addLog: (log: string) => addLog(log),
        clearLogs: () => clearLogs()
      }}>
      {props.children}
    </LoggingContext.Provider>
  );
}
