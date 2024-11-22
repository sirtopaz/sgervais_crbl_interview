import { createContext } from "react";

import { LogDataState } from "./data.types";
import { LoadingStatus } from "./data.constants";

const DEFAULT_LOG_DATA_STATE: LogDataState = {
  logEventCount: 0,
  logEvents: [],
  status: LoadingStatus.START,
};

export const LogDataContext = createContext<LogDataState>(
  DEFAULT_LOG_DATA_STATE
);
