import { vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ActionIcon, IconButton } from "..";
import userEvent from "@testing-library/user-event";

const clickHandlerMock = vi.fn();

describe("COMPONENT:ACTION:IconButton", () => {
  it("should render a proper HTML with supplied props", () => {
    render(
      <IconButton
        icon={ActionIcon.OPEN}
        a11yLabel="TESTING_LABEL"
        onClick={clickHandlerMock}
      />
    );

    const button = screen.getByLabelText("TESTING_LABEL");

    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).toHaveClass("icon-button");
  });

  it("should have deterministic HTML", () => {
    // as a controlled visual component the same input props should always generate the same HTML structure

    const { container } = render(
      <IconButton
        icon={ActionIcon.CLOSED}
        a11yLabel="TESTING_LABEL"
        onClick={clickHandlerMock}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should handle click", async () => {
    render(
      <IconButton
        icon={ActionIcon.OPEN}
        a11yLabel="TESTING_LABEL"
        onClick={clickHandlerMock}
      />
    );

    const button = screen.getByLabelText("TESTING_LABEL");
    await userEvent.click(button);

    expect(clickHandlerMock).toHaveBeenCalled();
  });
});
