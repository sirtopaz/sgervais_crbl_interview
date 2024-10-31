import { type FC } from "react";

import "./App.scss";

import { LogView } from "../../page/log";

// TODO create page structure with header footer and main sections
const App: FC = () => {
  return (
    <>
      <header>
        <h1>Crbl Log Viewer</h1>
      </header>
      <LogView />
      <footer>
        <span className="info">By Sean Gervais</span>
      </footer>
    </>
  );
};

export default App;
