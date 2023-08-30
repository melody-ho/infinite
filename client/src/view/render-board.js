/// Imports ///
import { boardData } from "../model/board-data";
import { renderNextTile, renderTile } from "./render-tiles";
import { getPanLimits, panValue, viewCenter } from "../model/view-data";

/// Constants ///
/**
 * Index of tile at view center.
 * @type {string} "x,y"
 */
const CENTER_INDEX = "0,0";

/// Private ///
/**
 * Adjusts pan values to reflect new pan limits.
 */
const setNewPan = () => {
  const { xMin, xMax, yMin, yMax } = getPanLimits();
  if (panValue[0] < xMin) {
    panValue[0] = xMin;
  }
  if (panValue[0] > xMax) {
    panValue[0] = xMax;
  }
  if (panValue[1] < yMin) {
    panValue[1] = yMin;
  }
  if (panValue[1] > yMax) {
    panValue[1] = yMax;
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
    const tile = renderTile(indexes[i], CENTER_INDEX, viewCenter);
    board.appendChild(tile);
  }

  // render next tile
  const nextTile = renderNextTile();
  board.appendChild(nextTile);

  // adjust panned distances to new view
  setNewPan();
  board.style.setProperty("--move-x", `${panValue[0]}px`);
  board.style.setProperty("--move-y", `${panValue[1]}px`);
};

export default renderBoard;
