import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as data from "../../../common/data";
import { LoadingStatus } from "../../../common/data";
import LogEventTable from "../LogEventTable";

// setup mocks

const SAMPLE_LOG_EVENTS = [
  { time: new Date(2024, 0, 1).toISOString(), json: '{"test": "test1"}' },
  { time: new Date(2024, 0, 1).toISOString(), json: '{"test": "test2"}' },
  { time: new Date(2024, 0, 1).toISOString(), json: '{"test": "test3"}' },
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

    // check for headers
    expect(screen.getByText("Toggle Event Details")).toHaveClass("sr-only"); // hidden from view
    expect(screen.getByText("Time")).toBeInstanceOf(HTMLTableCellElement);
    expect(screen.getByText("Event")).toBeInstanceOf(HTMLTableCellElement);

    // check for expected rows
    expect(screen.queryAllByText("2024-01-01T06:00:00.000Z")).toHaveLength(3);
    expect(screen.getByText('{"test": "test1"}')).toBeInTheDocument();
    expect(screen.getByText('{"test": "test2"}')).toBeInTheDocument();
    expect(screen.getByText('{"test": "test3"}')).toBeInTheDocument();

    // check for expected footer
    expect(screen.getByText("Total Events: 3")).toBeInTheDocument();
    expect(screen.getByText("loaded")).toBeInTheDocument();

    expect(logDataStateSpy).toHaveBeenCalled();
  });

  it("should allow opening and closing of rows", async () => {
    render(<LogEventTable />);

    // find row buttons and open
    const rowButtons = screen.queryAllByLabelText(
      "Click to open row"
    ) as HTMLButtonElement[];

    // three buttons one per row
    expect(rowButtons).toHaveLength(3);

    //verify expected class
    expect(rowButtons[0].parentElement?.parentElement).not.toHaveClass("open");

    userEvent.click(rowButtons[0]);

    // open row changes label
    const openButton = await screen.findByLabelText("Click to close row");
    expect(openButton).toBeInTheDocument();

    //verify expected class change
    expect(openButton.parentElement?.parentElement).toHaveClass("open");

    // first row should be opened (new lines are seen as spaces in query) has a <pre> parent
    expect(screen.getByText('{ "test": "test1" }')).toBeInstanceOf(
      HTMLPreElement
    );

    // shouldn't have closed one any more being shown
    expect(screen.queryAllByText('{"test": "test1"}')).toHaveLength(0);

    //click to close
    userEvent.click(openButton);

    // first row should not be opened - has a <td> as parent and no longer formatted
    expect(await screen.findByText('{"test": "test1"}')).toBeInstanceOf(
      HTMLTableCellElement
    );
  });

  // TODO add more visual tests - such as pagination
});
