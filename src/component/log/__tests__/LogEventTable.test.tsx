import { vi } from "vitest";
import { render, screen } from "@testing-library/react";

import * as data from "../../../common/data";
import { LoadingStatus } from "../../../common/data";
import LogEventTable from "../LogEventTable";

// setup mocks

const SAMPLE_LOG_EVENTS = [
  { time: Date.now(), json: '{"test": "test1"}' },
  { time: Date.now(), json: '{"test": "test2"}' },
  { time: Date.now(), json: '{"test": "test3"}' },
];

const logDataStateSpy = vi
  .spyOn(data, "useLogDataState")
  .mockImplementation(() => {
    return {
      logEventCount: SAMPLE_LOG_EVENTS.length,
      logEvents: SAMPLE_LOG_EVENTS,
      status: LoadingStatus.DONE,
    };
  });

describe("COMPONENT:LOG:LogEventTable", () => {
  it("should display a table of log events", () => {
    render(<LogEventTable />);

    // TODO figure out why expect .toBeInDocument() is not being recognised for types

    // check for headers
    expect(screen.getByText("Toggle Event Details"));
    expect(screen.getByText("Time"));
    expect(screen.getByText("Event"));

    // check for expected rows
    expect(screen.getByText('{"test": "test1"}'));
    expect(screen.getByText('{"test": "test2"}'));
    expect(screen.getByText('{"test": "test3"}'));

    // check for expected footer
    expect(screen.getByText("Event Count: 3"));

    expect(logDataStateSpy).toHaveBeenCalled();
  });
});
