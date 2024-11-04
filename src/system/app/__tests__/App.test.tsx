import { vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { App } from "..";

// mock child components if not reflecting settings sent to them by this component
vi.mock("../../../page/log/LogView", () => {
  return {
    default: () => <div>Mock LogView</div>,
  };
});

describe("SYSTEM:APP:App", () => {
  it("renders the App component", () => {
    render(<App />);

    expect(screen.getByText("Crbl Log Viewer")).toBeInstanceOf(
      HTMLHeadingElement
    );

    expect(screen.getByText("Mock LogView"));

    expect(screen.getByText("By Sean Gervais")).toBeInTheDocument();
  });
});
