import { type FC } from "react";

import "./LogView.scss";

import { LogDataProvider } from "../../common/data";
import { LogEventTable } from "../../component/log";

const LOG_URL = "https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log";

// TODO add styling here for

const LogView: FC = () => {
  return (
    <main className="log-view">
      <LogDataProvider url={LOG_URL}>
        <LogEventTable />
      </LogDataProvider>
    </main>
  );
};

export default LogView;
