import { type FC } from "react";

import "./LogEventTable.scss";

import { useToggle } from "../../base/hooks";
import { LogEvent, useLogDataState } from "../../common/data";
import { ActionIcon, IconButton } from "../action";

// TODO add toggle state and display styling
const LogEventRow: FC<LogEvent> = ({ json, time }) => {
  const [open, toggleOpen] = useToggle();

  const icon = open ? ActionIcon.OPEN : ActionIcon.CLOSED;
  const a11y = open ? "Click to close row" : "Click to open row";
  const clickHandler = () => {
    toggleOpen();
  };

  return (
    <tr className="log-event-row">
      <td className="toggle">
        <IconButton icon={icon} a11yLabel={a11y} onClick={clickHandler} />
      </td>
      <td className="event-time">{new Date(time).toISOString()}</td>
      <td className="event-json">{json}</td>
    </tr>
  );
};

const LogEventTable: FC = () => {
  const { logEventCount, logEvents, status } = useLogDataState();

  return (
    <div className="log-event-table">
      <table>
        <thead>
          <tr>
            <th scope="col" className="toggle">
              <span className="sr-only">Toggle Event Details</span>
            </th>
            <th scope="col" className="event-time">
              Time
            </th>
            <th scope="col" className="event-json">
              Event
            </th>
          </tr>
        </thead>
        <tbody>
          {logEvents.map((event, idx) => (
            <LogEventRow key={`event_${idx}`} {...event} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>&nbsp;</td>
            <td>{status}</td>
            <td>
              Event Count: {new Intl.NumberFormat().format(logEventCount)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default LogEventTable;
