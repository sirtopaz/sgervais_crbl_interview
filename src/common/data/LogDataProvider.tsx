import { useEffect, useState, type FC, type ReactNode } from "react";

import { LoadingStatus } from "./data.constants";
import { LogDataState, LogEvent } from "./data.types";
import { NdjsonStreamLoader, LogDataContext } from "./data.helper";

interface LogDataProviderProps {
  url: string; // url for logs
  children: ReactNode;
}

const LogDataProvider: FC<LogDataProviderProps> = ({ url, children }) => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.START);
  const [logEvents, setLogEvents] = useState<LogEvent[]>([]); // TODO convert to reducer?? to make adding events to list easier
  const [logEventCount, setLogEventCount] = useState(0);

  useEffect(() => {
    NdjsonStreamLoader(url)
      .then((stream) => {
        setLogEventCount(0);
        setLogEvents([]);

        //TODO as reading stream, convert to event, update event count

        stream.getReader();
      })
      .catch(() => {
        // NOTE - IRL log the error to a service or console for debugging
        setStatus(LoadingStatus.ERROR);
      });
  }, [url]);

  const currentLogDataState: LogDataState = {
    logEventCount,
    logEvents,
    status,
  };

  return (
    <LogDataContext.Provider value={currentLogDataState}>
      {children}
    </LogDataContext.Provider>
  );
};

export default LogDataProvider;
