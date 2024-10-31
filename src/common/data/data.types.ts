import { LoadingStatus } from "./data.constants";

export interface LogEvent {
  json: string;
  time: number;
}

export interface LogDataState {
  logEventCount: number;
  logEvents: LogEvent[];
  status: LoadingStatus;
}
