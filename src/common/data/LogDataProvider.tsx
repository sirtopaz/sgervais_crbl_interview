import { useState, type FC, type ReactNode } from "react";

import { LoadingStatus } from "./data.constants";
import { logEvent } from "./data.types";

interface LogDataProviderProps {
  url: string; // url for logs
  children: ReactNode;
}

const LogDataProvider: FC<LogDataProviderProps> = ({ url, children }) => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.START);
  const [logEvents] = useState<logEvent[]>([]);
  const [logEventCount, setLogEventCount] = useState(0);

  //TODO - setup stream loader, provider and context

  return <>{children}</>;
};

export default LogDataProvider;
