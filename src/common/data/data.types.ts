import { LoadingStatus } from "./data.constants";

export interface LogEvent {
  json: string;
  time: string; // formatted date as ISO
}

export interface LogDataState {
  logEventCount: number;
  logEvents: LogEvent[];
  status: LoadingStatus;
}
