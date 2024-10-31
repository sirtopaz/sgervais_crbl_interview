import { useContext } from "react";

import { type LogDataState } from "./data.types";
import { LogDataContext } from "./data.helper";

export const useLogDataState = (): LogDataState => {
  return useContext(LogDataContext);
};
