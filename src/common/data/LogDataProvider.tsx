import { useEffect, useState, type FC, type ReactNode } from "react";

import { LoadingStatus } from "./data.constants";
import { LogDataState, LogEvent } from "./data.types";
import { NdjsonStreamLoader, LogDataContext } from "./data.helper";

interface LogDataProviderProps {
  url: string; // url for logs
  children: ReactNode;
}

const TIME_REGEX = /"_time":(\d+),/;

const LogDataProvider: FC<LogDataProviderProps> = ({ url, children }) => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.START);
  const [logEvents, setLogEvents] = useState<LogEvent[]>([]);
  const [logEventCount, setLogEventCount] = useState(0);

  useEffect(() => {
    NdjsonStreamLoader(url)
      .then((stream) => {
        setLogEventCount(0);
        setLogEvents([]);

        const reader = stream.getReader();

        // NOTE: former model was to stream each JSON indivdiually and get into state ASAP
        // - the consequence is more state changes which hosed the machine vs batching per chunk read so going with batching

        // read stream and convert JSON string into UI data model

        const processJson = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              setStatus(LoadingStatus.DONE);
              return;
            }

            const events = value.map((json) => {
              let time = "0";

              const match = json.match(TIME_REGEX);
              if (match) {
                time = match[1];
              }

              return {
                json,
                time: Number.parseInt(time, 10),
              };
            });

            // append events
            setLogEvents((evts) => evts.concat(events));
            setLogEventCount((count) => count + events.length);

            processJson();
          });
        };

        processJson();
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
