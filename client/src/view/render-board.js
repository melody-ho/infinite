/// Imports ///
import { renderNextTile, renderTile } from "./render-tiles";
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

  // render tiles in gameboard
  const indexes = Object.keys(boardData);
  for (let i = 0; i < indexes.length; i += 1) {
    const tile = renderTile(indexes[i]);
    board.appendChild(tile);
  }

  // render next tile
  const nextTile = renderNextTile();
  board.appendChild(nextTile);

  // adjust panned distances to new view
  setNewPan();
  board.style.setProperty("--move-x", `${pan.x}px`);
  board.style.setProperty("--move-y", `${pan.y}px`);
};

export default renderBoard;
