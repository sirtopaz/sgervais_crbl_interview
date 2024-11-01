import { useState, type FC } from "react";

import "./LogEventTable.scss";

import { useToggle } from "../../base/hooks";
import { LogEvent, useLogDataState } from "../../common/data";
import { ActionIcon, IconButton } from "../action";

const LogEventRow: FC<LogEvent> = ({ json, time }) => {
  const [open, toggleOpen] = useToggle();

  const icon = open ? ActionIcon.OPEN : ActionIcon.CLOSED;
  const a11y = open ? "Click to close row" : "Click to open row";
  const cn = `log-event-row${open ? " open" : ""}`; // NOTE this is quick & dirty
  const clickHandler = () => {
    toggleOpen();
  };

  return (
    <tr className={cn}>
      <td className="toggle">
        <IconButton icon={icon} a11yLabel={a11y} onClick={clickHandler} />
      </td>
      <td className="event-time">{new Date(time).toISOString()}</td>
      <td className="event-json">{json}</td>
    </tr>
  );
};

const PAGE_SIZE = 500;

// TODO create page changer
// TODO create JSON Pretty viewer - needs to handle nested JSON TOO :)

const LogEventTable: FC = () => {
  const [page, setPage] = useState(1);
  const { logEventCount, logEvents, status } = useLogDataState();

  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE - 1;

  return (
    <div className="log-event-table">
      <table>
        <thead>
          <tr>
            <th scope="col" className="toggle">
              <span className="sr-only">Toggle Event Details</span>
            </th>
            <th scope="col" className="event-time">
              Time - {status}
            </th>
            <th scope="col" className="event-json">
              Events
            </th>
          </tr>
        </thead>
        <tbody>
          {logEvents.slice(startIdx, endIdx).map((event, idx) => (
            <LogEventRow key={`event_${idx}`} {...event} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              Showing Page {page} of {Math.ceil(logEventCount / PAGE_SIZE)}
            </td>
            <td>
              Total Events: {new Intl.NumberFormat().format(logEventCount)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default LogEventTable;
