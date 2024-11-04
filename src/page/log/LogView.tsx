import { type FC } from "react";

import "./LogView.scss";

import { LogDataProvider, Api } from "../../common/data";
import { LogEventTable } from "../../component/log";

const LogView: FC = () => {
  return (
    <main className="log-view">
      <LogDataProvider url={Api.LOGS}>
        <LogEventTable />
      </LogDataProvider>
    </main>
  );
};

export default LogView;
