import { type FC } from "react";

import "./LogEventTable.scss";

import { LogEvent, useLogDataState } from "../../common/data";

// TODO add toggle state and display styling
const LogEventRow: FC<LogEvent> = ({ json, time }) => {
  return (
    <tr className="log-event-row">
      <td className="toggle">ICON</td>
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
            <th scope="col">
              <span className="sr-only">Toggle Event Details</span>
            </th>
            <th scope="col">Time</th>
            <th scope="col">Event</th>
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
            <td>Event Count: {logEventCount}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default LogEventTable;
