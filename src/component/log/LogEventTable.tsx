import {
  useState,
  type FC,
  type ChangeEventHandler,
  type FocusEventHandler,
} from "react";

import "./LogEventTable.scss";

import { useToggle } from "../../base/hooks";
import { LoadingStatus, LogEvent, useLogDataState } from "../../common/data";
import { ActionIcon, IconButton } from "../action";

interface PrettyJsonProps {
  json: string;
}

// very simple formatter for JSON one prop per line
const PrettyJson: FC<PrettyJsonProps> = ({ json }) => {
  let obj: unknown = { unknown: "unknown" };

  try {
    obj = JSON.parse(json);
  } catch (e) {
    obj = { error: `${e}`, json };
  }

  return <pre>{JSON.stringify(obj, null, 2)}</pre>;
};

const STATUS_LABEL = {
  [LoadingStatus.DONE]: "loaded",
  [LoadingStatus.ERROR]: "with error",
  [LoadingStatus.LOADING]: "still loading...",
  [LoadingStatus.START]: "started loading...",
};

const LogEventRow: FC<LogEvent> = ({ json, time }) => {
  const [open, toggleOpen] = useToggle();

  const icon = open ? ActionIcon.OPEN : ActionIcon.CLOSED;
  const a11y = open ? "Click to close row" : "Click to open row";
  const cn = `log-event-row${open ? " open" : ""}`; // NOTE this is quick & dirty class setting
  const clickHandler = () => {
    toggleOpen();
  };

  return (
    <tr className={cn}>
      <td className="toggle">
        <IconButton icon={icon} a11yLabel={a11y} onClick={clickHandler} />
      </td>
      <td className="event-time">{time}</td>
      <td className="event-json">{open ? <PrettyJson json={json} /> : json}</td>
    </tr>
  );
};

const PAGE_SIZE = 500;

const LogEventTable: FC = () => {
  const [page, setPage] = useState(1);
  const { logEventCount, logEvents, status } = useLogDataState();

  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE - 1;
  const pages = Math.ceil(logEventCount / PAGE_SIZE);

  const handlePageChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const val = evt.target.value;

    if (val) {
      let pageNum = Number.parseInt(val, 10);
      pageNum = Math.max(1, Math.min(pageNum, pages)); // only allow valid pages to be shown
      setPage(pageNum);
    }
  };

  const handlePageBlur: FocusEventHandler<HTMLInputElement> = (evt) => {
    evt.target.value = `${page}`; // clean up user entered mistakes
  };

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
          {logEvents.slice(startIdx, endIdx).map((event, idx) => (
            <LogEventRow key={`event_${startIdx + idx}`} {...event} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              Showing Page{" "}
              <input
                className="page-changer"
                defaultValue={1}
                inputMode="numeric"
                max={pages}
                min={1}
                onBlur={handlePageBlur}
                onChange={handlePageChange}
                pattern="\d*"
                type="number"
              />{" "}
              of {pages}
            </td>
            <td>
              <span>
                Total Events: {new Intl.NumberFormat().format(logEventCount)}
              </span>
              &nbsp;
              <span>{STATUS_LABEL[status]}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default LogEventTable;
