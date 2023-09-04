/// Imports ///
import {
  renderStaticNext,
  renderTile,
  renderTrackingNext,
} from "./render-tiles";
import { adjustZoom } from "./zoom";
import { boardData } from "../model/board-data";
import { pan } from "../model/view-data";

/// Private ///
/**
 * Adjusts pan values to reflect new pan limits.
 */
const setNewPan = () => {
  const { xMin, xMax, yMin, yMax } = pan.getLimits();
  if (pan.x < xMin) {
    pan.x = xMin;
  }
  if (pan.x > xMax) {
    pan.x = xMax;
  }
  if (pan.y < yMin) {
    pan.y = yMin;
  }
  if (pan.y > yMax) {
    pan.y = yMax;
  }
};

/// Public ///
/**
 * Renders board view.
 */
const renderBoard = () => {
  const board = document.querySelector(".board");

  // adjust tile size to new viewport size //
  adjustZoom();

  // render tiles in gameboard //
  const indexes = Object.keys(boardData);
  for (let i = 0; i < indexes.length; i += 1) {
    const tile = renderTile(indexes[i]);
    board.appendChild(tile);
  }

  // render next tile //
  // for hover devices
  const hoverNext = renderTrackingNext();
  board.appendChild(hoverNext);
  // for devices without hover
  const staticNext = renderStaticNext();
  const prevStaticNext = document.querySelector(".next-tile--static");
  prevStaticNext.replaceWith(staticNext);

  // adjust panned distances to new view //
  setNewPan();
  board.style.setProperty("--move-x", `${pan.x}px`);
  board.style.setProperty("--move-y", `${pan.y}px`);
};

export default renderBoard;
