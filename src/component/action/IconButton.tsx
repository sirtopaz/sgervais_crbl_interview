import { type MouseEventHandler, type FC } from "react";

import "./IconButton.scss";

import { ActionIcon } from "./action.constants";

// icons from: https://www.svgrepo.com/collection/solar-linear-icons
// since these icons follow the same SVG structure only swapping paths is needed
const ICON_MAP = {
  [ActionIcon.CLOSED]: "M9 5L15 12L9 19", // "alt-arrow-right-svgrepo-com",
  [ActionIcon.OPEN]: "M19 9L12 15L5 9", //"alt-arrow-down-svgrepo-com",
};

interface IconButtonProps {
  a11yLabel: string;
  icon: ActionIcon;
  onClick: MouseEventHandler;
}

// NOTE icons are hidden from screen reader as they only serve as visual indicators
const IconButton: FC<IconButtonProps> = ({ a11yLabel, icon, onClick }) => {
  return (
    <button
      aria-label={a11yLabel}
      className="icon-button"
      onClick={onClick}
      type="button"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden role="presentation">
        <title>{a11yLabel}</title>
        <path
          d={ICON_MAP[icon]}
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};

export default IconButton;
